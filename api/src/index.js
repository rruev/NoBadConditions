import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import router from "./routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

//external middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//internal middleware
app.use(authMiddleware);

app.use('/api/v1', router);

const port = process.env.PORT || 3000;

// for vercel
app.get("/", (req, res) => {
    res.json({ message: "API is running" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;