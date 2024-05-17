import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(
  express.json({
    limit: "16kb",
  })
);

import dataRouter from "./routes/data_routes.js";

app.use("/api/v1/data", dataRouter);
export { app };
