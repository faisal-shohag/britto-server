import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express()
const port = 3000


import get from './API/get.js'
import post from './API/post.js'
import put from './API/put.js'
import DELETE from './API/delete.js';
import circle from './API/circle.js';
import genai from './API/genai.js'


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
app.use(DELETE)
app.use(circle)
app.use(genai)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})





export default app
// module.exports = app