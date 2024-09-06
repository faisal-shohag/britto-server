import { Router } from "express";
import prisma from "../DB/db.config.js";
const router = Router();
import ImageKit from 'imagekit';

const imageKit = new ImageKit({
    publicKey: "public_Vh5nLR3Jrm4T8zA+77I+lh7nZSY=",
    privateKey: "private_NmXzE7tSS12GF17YPjVqGuEolgM=",
    urlEndpoint: "https://ik.imagekit.io/britto",
});



// Updated Post routes
router.post("/posts", async (req, res) => {
    try {
      const { content, authorId, images } = req.body;
      const post = await prisma.post.create({
        data: {
          content,
          authorId: parseInt(authorId),
          images: {
            create: images.map(({ url, fileId }) => ({ url, fileId })),
          },
        },
        include: { images: true },
      });
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

router.get("/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [posts, totalCount] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          comments: {
            select: {
              id: true,
            },
          },
          likes: {
            select: {
              id: true,
            },
          },
          images: true,
        },
      }),
      prisma.post.count(),
    ]);

    const formattedPosts = posts.map((post) => ({
      ...post,
      commentCount: post.comments.length,
      likeCount: post.likes.length,
      comments: undefined,
      likes: undefined,
    }));

    res.json({
      posts: formattedPosts,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

router.post("/posts/:postId/toggle-like", async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = parseInt(req.body.userId); // Assuming you have user authentication middleware

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userId,
        postId: parseInt(postId),
        commentId: null,
        replyId: null,
      },
    });

    if (existingLike) {
      // Unlike
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      // Like
      await prisma.like.create({
        data: {
          user: { connect: { id: userId } },
          post: { connect: { id: parseInt(postId) } },
        },
      });
    }

    // Get updated like count
    const updatedPost = await prisma.post.findUnique({
      where: { id: parseInt(postId) },
      include: { likes: { select: { id: true } } },
    });

    res.json({
      liked: !existingLike,
      likeCount: updatedPost.likes.length,
    });
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "An error occurred while toggling like" });
  }
});

router.delete('/posts/:postId/:userId', async (req, res) => {
    const { postId } = req.params;
    const userId = parseInt(req.params.userId); // Assuming you have user authentication middleware
  
    try {
      // Use a transaction for database operations
      await prisma.$transaction(async (prisma) => {
        // Find the post
        const post = await prisma.post.findUnique({
          where: { id: parseInt(postId) },
          include: { images: true }
        });
  
        // Check if the post exists and belongs to the user
        if (!post) {
          throw new Error('Post not found');
        }
        if (post.authorId !== userId) {
          throw new Error('You are not authorized to delete this post');
        }
  
        // Delete images from ImageKit.io
        const deleteImagePromises = post.images.map(image => {
          return new Promise((resolve) => {
            if (!image.fileId) {
              console.error(`No fileId found for image: ${image.url}`);
              resolve({ success: false, url: image.url });
              return;
            }
  
            imageKit.deleteFile(image.fileId, (error, result) => {
              if (error) {
                console.error(`Failed to delete image ${image.fileId}:`, error);
                resolve({ success: false, url: image.url });
              } else {
                resolve({ success: true, url: image.url });
              }
            });
          });
        });
  
        const deleteResults = await Promise.all(deleteImagePromises);
        
        // Log results of image deletions
        deleteResults.forEach(result => {
          if (result.success) {
            console.log(`Successfully deleted image: ${result.url}`);
          } else {
            console.log(`Failed to delete image: ${result.url}`);
          }
        });
  
        // Delete the post and associated images from the database
        await prisma.post.delete({
          where: { id: parseInt(postId) },
        });
      });
  
      res.json({ message: 'Post and associated images deleted successfully' });
    } catch (error) {
      console.error('Error deleting post and images:', error);
      res.status(500).json({ error: error.message || 'An error occurred while deleting the post and images' });
    }
  });

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: true, comments: true, likes: true, images: true },
    });
    res.json(post);
  } catch (error) {
    res.status(404).json({ error: "Post not found" });
  }
});

// New route to add images to an existing post
router.post("/posts/:id/images", async (req, res) => {
  try {
    const { images } = req.body;
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: {
        images: {
          create: images.map((url) => ({ url })),
        },
      },
      include: { images: true },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// New route to delete an image from a post
router.delete("/posts/:postId/images/:imageId", async (req, res) => {
  try {
    await prisma.image.delete({
      where: {
        id: parseInt(req.params.imageId),
        postId: parseInt(req.params.postId),
      },
    });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: "Image not found" });
  }
});

export default router;
