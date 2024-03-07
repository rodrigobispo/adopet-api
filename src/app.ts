import express, { Response } from "express";
import router from "./routes";

const app = express();
app.use(express.json());
router(app);

app.get("/", (_, res: Response) => {
  res.send("Estudando TypeScript.");
});

export default app;
