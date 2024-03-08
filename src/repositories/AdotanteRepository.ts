import { Repository } from "typeorm";
import Adotante from "../entities/Adotante";

export default class AdotanteRepository {
  constructor(private repository: Repository<Adotante>) {}
  async criaAdotante(adotante: Adotante): Promise<void> {
    await this.repository.save(adotante);
  }
}
