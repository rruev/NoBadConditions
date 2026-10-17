import { Router } from 'express';
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { cragController } from '../controllers/index.js';

const cragRouter = Router();

cragRouter.get('/', isAuthenticated, cragController.getAll);
cragRouter.post('/', isAuthenticated, cragController.create);
cragRouter.route('/:cragId')
    .get(isAuthenticated, cragController.getById)
    .put(isAuthenticated, cragController.update)
    .delete(isAuthenticated, cragController.remove);

export default cragRouter;