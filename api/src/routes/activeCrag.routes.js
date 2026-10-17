import { Router } from 'express';
import { activeCragController } from '../controllers/index.js';

const activeCragRouter = Router();

activeCragRouter.get('/', activeCragController.getAll);
activeCragRouter.post('/', activeCragController.create);
activeCragRouter.delete('/:activeCragId', activeCragController.remove);

export default activeCragRouter;