import { Router } from "express";
import { conditionsController } from "../controllers/index.js";

const conditionsRoutes = Router();

conditionsRoutes.get("/", conditionsController.getByLocation);
conditionsRoutes.get("/:id", conditionsController.getByCragId);

export default conditionsRoutes;