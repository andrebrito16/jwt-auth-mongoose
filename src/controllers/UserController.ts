import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';
const dotenvSafe = require('dotenv-safe');
dotenvSafe.config();

const JWT_SECRET =
  'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

class UserController {
  async createAccount(req: Request, res: Response) {
    const {
      email,
      password: plainTextPassword,
      firstName,
      lastName
    } = req.body;

    if (!email || !plainTextPassword) {
      return res.status(400).json({ error: 'No email or password provided' });
    }

    if (plainTextPassword.length < 5) {
      return res.json({
        status: 'error',
        error: 'Password too small. Should be atleast 6 characters'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ error: 'Account already exists!' });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
      const response = await User.create({
        email,
        password,
        firstName,
        lastName
      });
      console.log('User created successfully: ', response);
    } catch (error) {
      console.log(error);
      if (error.code === 11000) {
        // duplicate key
        return res.json({ status: 'error', error: 'E-mail already in use' });
      }
      throw error;
    }

    res.json({ status: 'ok' });
  }
}

export { UserController };
