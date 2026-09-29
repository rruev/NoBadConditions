import { Router } from "express";
import { conditionsController } from "../../controllers";

const conditionsRoutes = Router();

conditionsRoutes.get("/", conditionsController.getByLocation);
conditionsRoutes.get("/:id", conditionsController.getByCragId);

export default conditionsRoutes;