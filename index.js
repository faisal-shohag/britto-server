const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser') 
const port = 3000


const get = require('./API/get')
const post = require('./API/post')
const put = require('./API/put')


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(get)
app.use(post)
app.use(put)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})