import { Router } from 'express'
import prisma from '../../DB/db.config.js'
const router = Router()

// Create a new course
router.post('/courses', async (req, res) => {
    const { start, end } = req.body;
    try {
      const newCourse = await prisma.course.create({
        data: {
         ...req.body,
          start: new Date(start),
          end: new Date(end), 
        },
      });
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Failed to create course' });
    }
  });


export default router