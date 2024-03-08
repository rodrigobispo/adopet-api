import { DataSource } from "typeorm";
import Pet from "../entities/Pet";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/db/database.sqlite",
  synchronize: true,
  entities: [Pet],
});
