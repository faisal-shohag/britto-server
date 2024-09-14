import { Router } from 'express'
import prisma from '../../DB/db.config.js'
const router = Router()

// Update a course by ID
router.put('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { title, userId, description, type, photoURL, routine, duration, isPublished } = req.body;
    try {
      const updatedCourse = await prisma.course.update({
        where: { id: parseInt(id) },
        data: {
          title,
          userId,
          description,
          type,
          photoURL,
          routine,
          duration: new Date(duration),
          isPublished,
        },
      });
      res.json(updatedCourse);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update course' });
    }
  });



export default router