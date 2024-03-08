import express, { Response } from "express";
import router from "./routes";
import { AppDataSource } from "./db/data-source";

const app = express();
app.use(express.json());
router(app);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado.");
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (_, res: Response) => {
  res.send("Estudando TypeScript.");
});

export default app;
