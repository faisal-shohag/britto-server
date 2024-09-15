import { Router } from 'express';
import prisma from '../../DB/db.config.js';
const router = Router();

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        user: true,
        
        // resources: true,
        // exams: true,
      },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get a single course by ID
router.get('/courses/:id/:userId', async (req, res) => {
  const { id, userId } = req.params;

  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        resources: true,
        exams: true,
        // Count the enrolled users
        _count: {
          select: { enrolledUsers: true }, // Get the enrolledUsers count
        },
        enrolledUsers: {
          select: { userId: true }, // Fetch only userId to check enrollment
        },
      },
    });

    if (course) {
      // Check if the user is enrolled
      const isEnrolled = course.enrolledUsers.some(
        (enrollment) => enrollment.userId === parseInt(userId)
      );

      res.status(200).json({
        ...course,
        enrolledUsersCount: course._count.enrolledUsers, // Add enrolled users count
        isEnrolled,                                     // Add isEnrolled flag
      });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch the course' });
  }
});


//exams
router.get('/exams', async (req, res) => {
  try {
    const exams = await prisma.exam.findMany({
      include: {
        course: true,
        questions: true,
        // Include other related models as needed
      },
    });
    res.json(exams);
  } catch (error) {
    console.error('Error fetching exams:', error);
    res.status(500).json({ error: 'Failed to fetch exams' });
  }
});


export default router