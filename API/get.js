const { Router } = require('express')
const prisma = require('../DB/db.config')
const router = Router()

router.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
})


module.exports = router
