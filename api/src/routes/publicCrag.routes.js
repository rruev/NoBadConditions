import { Router } from "express";
import { publicCragController } from "../controllers/index.js";

const publicCragRouter = Router();

publicCragRouter.get("/", publicCragController.getAll);
publicCragRouter.post("/", publicCragController.create);
publicCragRouter.route("/:publicCragId")
    .get(publicCragController.getById)
    .put(publicCragController.update)
    .delete(publicCragController.remove);

export default publicCragRouter;