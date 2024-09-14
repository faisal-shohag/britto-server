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
router.get('/courses/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        user: true,
        resources: true,
        exams: true,
      },
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the course' });
  }
});

export default router