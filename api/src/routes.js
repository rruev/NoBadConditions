import { Router } from "express";
import conditionsRoutes from "./routes/conditions.routes.js";
import publicCragRoutes from "./routes/publicCrag.routes.js";

const router = Router();
router.use("/conditions", conditionsRoutes);
router.use("/public-crags", publicCragRoutes);

export default router;