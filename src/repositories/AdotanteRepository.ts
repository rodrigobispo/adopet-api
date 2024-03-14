import { Repository } from "typeorm";
import Adotante from "../entities/Adotante";
import Endereco from "../entities/Endereco";
import { NaoEncontrado } from "../utils/manipulacaoDeErros";

export default class AdotanteRepository {
  constructor(private repository: Repository<Adotante>) {}

  async criaAdotante(adotante: Adotante): Promise<void> {
    await this.repository.save(adotante);
  }

  async listaAdotantes(): Promise<Adotante[]> {
    return await this.repository.find();
  }

  async atualizaAdotante(
    id: number,
    newData: Adotante
  ): Promise<{ message?: string }> {
    const adotanteToUpdate = await this.repository.findOne({ where: { id } });

    if (!adotanteToUpdate) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    Object.assign(adotanteToUpdate, newData);

    await this.repository.save(adotanteToUpdate);

    return { message: "Adotante atualizado com sucesso." };
  }

  async deletaAdotante(
    id: number
  ): Promise<{ message?: string }> {
    const adotanteToRemove = await this.repository.findOne({ where: { id } });

    if (!adotanteToRemove) {
      throw new NaoEncontrado("Adotante não encontrado");
    }

    await this.repository.remove(adotanteToRemove);

    return { message: "Adotante removido com sucesso." };
  }

  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: Endereco
  ): Promise<{ message?: string }> {

    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      throw new NaoEncontrado("Adotante não encontrado");
    }
    const novoEndereco = new Endereco(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);
    return { message: "Endereço de adotante atualizado com sucesso." };
  }
}
