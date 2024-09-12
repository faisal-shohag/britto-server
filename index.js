import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';  // Keep this in case you need to adjust CORS later
const app = express();
const port = 3000;

import get from './API/get.js';
import post from './API/post.js';
import put from './API/put.js';
import DELETE from './API/delete.js';
import circle from './API/circle.js';
import genai from './API/genai.js';

// Allow CORS middleware based on the Vercel pattern
const allowCors = fn => async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin, or specify allowed domains
  // Optional: You can allow only requests from the origin in the request headers
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();  // Handle the preflight request for CORS
  }

  // Proceed to the next middleware or handler
  return await fn(req, res, next);
};

// Use the CORS middleware in the Express app
app.use(allowCors((req, res, next) => {
  next();  // Continue to other middlewares
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API routes
app.get('/', (req, res) => {
  const d = new Date();
  res.end(d.toString());  // Basic handler to check the server status
});

// Import and use your other routes
app.use(get);
app.use(post);
app.use(put);
app.use(DELETE);
app.use(circle);
app.use(genai);

// Start the server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

export default app;
