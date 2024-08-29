const { Router } = require('express')
const prisma = require('../DB/db.config')
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


module.exports = router