import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes.js";

const app = express();

//external middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', router);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});