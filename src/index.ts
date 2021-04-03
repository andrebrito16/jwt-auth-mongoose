import express from 'express';
import { router } from './routes';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(
  'mongodb+srv://testUser:AndreBrito@cluster0.r6xzy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 5,
    connectTimeoutMS: 10000,
    family: 4
  }
);

app.use(express.json());
app.use(router);

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
