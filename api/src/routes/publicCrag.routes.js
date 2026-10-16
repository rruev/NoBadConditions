import { Router } from "express";
import { publicCragController } from "../controllers/index";

const publicCragRoutes = Router();

publicCragRoutes.get("/", publicCragController.getAll);
publicCragRoutes.post("/", publicCragController.create);
publicCragRoutes.route("/:publicCragId")
    .get(publicCragController.getById)
    .put(publicCragController.update)
    .delete(publicCragController.remove);

export default publicCragRoutes;