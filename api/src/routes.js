import { Router } from "express";
import conditionsRoutes from "./routes/conditions/conditions.routes.js";

const router = Router();
router.use("/conditions", conditionsRoutes);

export default router;