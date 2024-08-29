const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const router = express.Router();

router.put('/users/profile-photo/:email', async (req, res) => {
    const userEmail = req.params.email;
    const { photoURL, thumb } = req.body;

    try {
        // Update the user's photoURL
        const updatedUser = await prisma.users.update({
            where: {
                email: userEmail,
            },
            data:{
                photoURL: photoURL,
                thumb: thumb,
            },
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user photo:', error);
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/update/:id', async (req, res) => {
    const userId = parseInt(req.params.id);
    if(req.body.phone && req.body.institute && req.body.group) {
        req.body.isCompleted = true;
    } else {
        req.body.isCompleted = false;
    }
    
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: userId,
            },
            data: req.body,
        });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
