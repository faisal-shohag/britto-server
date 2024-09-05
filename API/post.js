import { Router } from 'express'
import prisma from '../DB/db.config.js'
const router = Router()



router.post('/users', async (req, res) => {
    try {
        const { email, displayName, phone, institute, photoURL, ID, groups, district, father, mother, packages } = req.body;

        // Check if a user with the provided email already exists
        const existingUser = await prisma.users.findUnique({
            where: {
                email: email,
            },
        });

        if (existingUser) {
            // If the user already exists, return a message without updating
            return res.status(200).json({status: 'ok'});
        }

        // If the user does not exist, create a new user
        const newUser = await prisma.users.create({
            data: {
                displayName,
                email,
                phone,
                institute,
                photoURL,
                ID,
                groups,
                district,
                father,
                mother,
                packages,
            },
        });

        // Return the newly created user
        return res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ error: error.message });
    }
});


router.post('/practices', async (req, res) => {
    try {
        const data= req.body
        // console.log(data)
        const practice = await prisma.practices.create({
            data
        })
        res.json(practice)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})



// Questions
router.post('/questions', async (req, res) => {
    try {
        const { title, options, explanation, correctAnswer, userId, tags } = req.body;

        // Create the question
        const question = await prisma.question.create({
            data: {
                title,
                explanation,
                correctAnswer,
                user: { connect: { id: userId } },
                options: {
                    create: options.map((option) => ({
                        text: option,
                    })),
                },
                tags: {
                    create: tags.map((tag) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: tag },
                                create: { name: tag },
                            },
                        },
                    })),
                },
            },
            include: {
                options: true,
                tags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        res.status(201).json({ question });
    } catch (error) {
        console.error('Error creating question:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;