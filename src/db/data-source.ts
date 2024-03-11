import { DataSource } from "typeorm";
import Pet from "../entities/Pet";
import Adotante from "../entities/Adotante";
import Endereco from "../entities/Endereco";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "./src/db/database.sqlite",
  synchronize: true,
  entities: [Pet, Adotante, Endereco],
});
