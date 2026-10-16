import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { isAuthenticated, isGuest } from '../middlewares/auth.middleware.js';

const userRoutes = Router();

userRoutes.post('/', isGuest, userController.register);
userRoutes.post('/login', isGuest, userController.login);
userRoutes.get('/logout', isAuthenticated, userController.logout);
userRoutes.get('/me', isAuthenticated, userController.getUser);

userRoutes.get('/:id', isAuthenticated, userController.getById);
userRoutes.put('/:id', isAuthenticated, userController.update);
userRoutes.delete('/:id', isAuthenticated, userController.remove);

export default userRoutes;