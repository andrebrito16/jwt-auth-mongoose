import mongoose, { mongo } from 'mongoose';

import "dotenv/config";

interface Erro {
  error: JSON;
}

export interface ProcessEnv {
  [key: string]: string | undefined
}

function DataBaseConncetion() {
  mongoose.connect(
    `${process.env.MONGO_URI}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    }
  );

  mongoose.set('useFindAndModify', false);
  mongoose.Promise = global.Promise;

  mongoose.connection.on('connected', () => {
    console.log('Mongoose has successfully connected!');
  });

  mongoose.connection.on('err', (error: Erro) => {
    console.error(`Mongoose connection error: \n${error}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose connection lost');
  });
}

export { DataBaseConncetion }