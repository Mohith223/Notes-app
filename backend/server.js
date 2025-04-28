// Notes-app/backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import NotesRoute from './routes/routes.js';

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());    // parse JSON bodies

// ===== HEALTHCHECK =====
app.get('/', (req, res) => {
  console.log('GET / hit:', req.method, req.path);
  return res.status(200).send('Welcome to my Note Making Application');
});

// ===== NOTES ROUTES =====
// All CRUD + bulk-delete live here
app.use('/notes', NotesRoute);

// ===== START =====
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database');
    app.listen(process.env.PORT, () => {
      console.log(`App listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error('DB connection error:', err);
  }
};

start();
