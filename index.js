import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

import get from './API/get.js';
import post from './API/post.js';
import put from './API/put.js';
import DELETE from './API/delete.js';
import circle from './API/circle.js';
import genai from './API/genai.js';

// Configure CORS to allow Vercel and other specific origins
const allowedOrigins = [
  'https://britto.vercel.app', // replace with your actual Vercel app URL
  'http://localhost:5173', // allow local development
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(get);
app.use(post);
app.use(put);
app.use(DELETE);
app.use(circle);
app.use(genai);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
