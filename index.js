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

import courseGet from './API/course/get.js';
import coursePost from './API/course/post.js';
import coursePut from './API/course/put.js';
import courseDelete from './API/course/delete.js';


app.use(cors())
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.send('Hello World!--Updated')
})

app.use(get)
app.use(post)
app.use(put)
app.use(DELETE)
app.use(circle)
app.use(genai)

app.use(courseGet)
app.use(coursePost)
app.use(coursePut)
app.use(courseDelete)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})





export default app
// module.exports = app