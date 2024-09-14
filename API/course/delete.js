import { Router } from 'express'
import prisma from '../../DB/db.config.js'
const router = Router()


// Delete a course by ID
router.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.course.delete({
        where: { id: parseInt(id) },
      });
      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete course' });
    }
  });
  
export default router;


