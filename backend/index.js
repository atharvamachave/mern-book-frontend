import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import route from './routes/bookRoute.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 7000;
const DB_URL = process.env.MONGO_URL;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('Database Connected Succcessfully...');
    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use('/api', route);
