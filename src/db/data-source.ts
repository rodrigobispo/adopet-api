import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/db/database.sqlite",
  synchronize: true,
  entities: [],
});
