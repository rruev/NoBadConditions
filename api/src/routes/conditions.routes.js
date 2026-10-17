import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { conditionsController } from "../controllers/index.js";

const conditionsRouter = Router();

conditionsRouter.get("/", conditionsController.getByLocation);
conditionsRouter.get("/:cragId", isAuthenticated, conditionsController.getByCragId);

export default conditionsRouter;