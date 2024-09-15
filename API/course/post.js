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


  router.post('/enroll', async (req, res) => {
    const { userId, courseId } = req.body;
  
    try {
      // Check if the user is already enrolled in the course
      const existingEnrollment = await prisma.enrolledCourse.findUnique({
        where: {
          userId_courseId: {
            userId: parseInt(userId),
            courseId: parseInt(courseId),
          },
        },
      });
  
      if (existingEnrollment) {
        return res.status(400).json({ error: 'You have already enrolled in this course' });
      }
  
      // Enroll the user in the course
      const enrollment = await prisma.enrolledCourse.create({
        data: {
          userId: parseInt(userId),
          courseId: parseInt(courseId),
        },
      });
  
      res.status(201).json({ message: 'Enrollment successful', enrollment });
    } catch (error) {
      console.error('Error enrolling user in course:', error);
      res.status(500).json({ error: 'Failed to enroll user in course' });
    }
  });


  // exam
  router.post('/exams', async (req, res) => {
    const { title, description, type, duration, courseId, isPublished } = req.body;
  
    try {
      const newExam = await prisma.exam.create({
        data: {
          title,
          description,
          type,
          duration: parseInt(duration),
          courseId: parseInt(courseId),
          isPublished: isPublished || false,
        },
      });
  
      res.status(201).json(newExam);
    } catch (error) {
      console.error('Error creating exam:', error);
      res.status(500).json({ error: 'Failed to create exam' });
    }
  });

export default router