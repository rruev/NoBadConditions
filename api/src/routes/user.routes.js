import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { isAuthenticated, isGuest } from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.post('/', isGuest, userController.register);
userRouter.post('/login', isGuest, userController.login);
userRouter.post('/logout', isAuthenticated, userController.logout);
userRouter.get('/me', isAuthenticated, userController.getUser);

userRouter.route('/:userId')
    .get(isAuthenticated, userController.getById)
    .put(isAuthenticated, userController.update)
    .delete(isAuthenticated, userController.remove);

export default userRouter;