import { Router } from 'express';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();

const userController = new UserController();
const authController = new AuthController();

router.post('/users', userController.createAccount);
router.post('/auth', authController.Login);
//(READ)          GET     /users 
router.get('/users', authMiddleware, userController.getUser)

export { router };
