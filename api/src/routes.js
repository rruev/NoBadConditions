import { Router } from "express";
import conditionsRouter from "./routes/conditions.routes.js";
import publicCragRouter from "./routes/publicCrag.routes.js";
import userRouter from "./routes/user.routes.js";
import cragRouter from "./routes/crag.routes.js";
import activeCragRouter from "./routes/activeCrag.routes.js";

const router = Router();
router.use("/conditions", conditionsRouter);
router.use("/public-crags", publicCragRouter);
router.use("/users", userRouter);
router.use("/crags", cragRouter);
router.use("/active-crags", activeCragRouter);

export default router;