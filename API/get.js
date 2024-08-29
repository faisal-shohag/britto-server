const { Router } = require('express')
const prisma = require('../DB/db.config')
const router = Router()


router.get('/users/:email', async (req, res) => {
    try {
        const { email } = req.params
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await prisma.users.findMany()
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  
    
})


router.get('/practices', async (req, res) => {
    try {
        const practices = await prisma.practices.findMany()
        res.json(practices)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

router.get('/practices/:subject', async (req, res) => {
    try {
        const { subject } = req.params
        const practices = await prisma.practices.findMany({
            where: {
                subject: subject
            },
            orderBy: {
                id: 'asc',
            },
            select: {
                id: true,
                examName: true,
                chapter: true,
                subject: true
            }
        })
        res.json(practices)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.get('/practices/exams/:id', async (req, res) => {
    try {
        const { id } = req.params
        const practices = await prisma.practices.findUnique({
            where: {
                id: Number(id)
            },
        })
        res.json(practices)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

router.get('/notices', async (req, res) => {
    try {
        const notices = await prisma.notices.findMany({
            take: 1,
            orderBy: {
                date: 'desc',
            },
            
        })
        res.json(notices)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

module.exports = router
