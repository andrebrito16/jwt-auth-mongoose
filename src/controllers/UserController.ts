import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';
const dotenvSafe = require('dotenv-safe');
dotenvSafe.config();


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
      return res.status(400).json({ error: 'Account already exists!' });
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
        return res.status(401).json({ status: 'error', error: 'E-mail already in use' });
      }
      throw error;
    }

    const user = await User.findOne({ email }).lean();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    res.status(201).json({ status: 'Account created!',
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    token: token});
  }

  async getUser(req: Request, res: Response) {
    const { userId } = req;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    delete user.password;
    return res.json(user);
  }

}

export { UserController };
