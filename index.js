const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const get = require('./API/get')


app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(get)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})