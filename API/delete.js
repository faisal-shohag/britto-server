import { Router } from 'express'
import prisma from '../DB/db.config.js'
const router = Router()

router.delete('/questions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.question.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).end();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete the question' });
    }
});

export default router