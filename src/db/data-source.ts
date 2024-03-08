import { DataSource } from "typeorm";
import Pet from "../entities/Pet";
import Adotante from "../entities/Adotante";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/db/database.sqlite",
  synchronize: true,
  entities: [Pet, Adotante],
});
