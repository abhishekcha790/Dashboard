import dotenv from "dotenv";

import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = process.env.PORT || 8000;
app.listen(8000, () => {
  console.log("server started");
});
