import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User from '../models/User';
import bcrypt from 'bcryptjs';
const dotenvSafe = require('dotenv-safe');
dotenvSafe.config();

class AuthController {
  async Login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).lean();

    if (!user) {
      return res.json({ status: 'error', error: 'Invalid username/password!' });
    }

    if (await bcrypt.compare(password, user.password)) {
      // the username, password combination is successful

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email
        },
        process.env.JWT_SECRET!
      );

      return res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: token
      });
    }

    res.status(400).json({ status: 'error', error: 'Invalid username/password' });
  }
}

export { AuthController };
