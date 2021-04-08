import express from 'express';
import { router } from './routes';
import mongoose from 'mongoose';
import { DataBaseConncetion } from './utils/mongoose';

const app = express();

DataBaseConncetion();

app.use(express.json());
app.use(router);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
