import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { conditionsController } from "../controllers/index.js";

const conditionsRoutes = Router();

conditionsRoutes.get("/", conditionsController.getByLocation);
conditionsRoutes.get("/:cragId", isAuthenticated, conditionsController.getByCragId);

export default conditionsRoutes;