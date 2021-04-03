import mongoose, { mongo } from 'mongoose';

interface Erro {
  error: JSON;
}

module.exports = {
  init: () => {
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
};
