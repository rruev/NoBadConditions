import { Router } from "express";
import conditionsRoutes from "./routes/conditions.routes.js";
import publicCragRoutes from "./routes/publicCrag.routes.js";
import userRoutes from "./routes/user.routes.js";

const router = Router();
router.use("/conditions", conditionsRoutes);
router.use("/public-crags", publicCragRoutes);
router.use("/users", userRoutes);

export default router;