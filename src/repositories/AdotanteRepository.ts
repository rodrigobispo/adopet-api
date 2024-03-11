import { Repository } from "typeorm";
import Adotante from "../entities/Adotante";
import Endereco from "../entities/Endereco";

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
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToUpdate = await this.repository.findOne({ where: { id } });

      if (!adotanteToUpdate) {
        return { success: false, message: "Adotante não encontrado" };
      }

      Object.assign(adotanteToUpdate, newData);

      await this.repository.save(adotanteToUpdate);

      return { success: true, message: "Adotante atualizado com sucesso." };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o adotante.",
      };
    }
  }

  async deletaAdotante(
    id: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const adotanteToRemove = await this.repository.findOne({ where: { id } });

      if (!adotanteToRemove) {
        return { success: false, message: "Adotante não encontrado" };
      }

      await this.repository.remove(adotanteToRemove);

      return { success: true, message: "Adotante removido com sucesso." };
    } catch (error) {
      // Se ocorrer um erro inesperado, você pode retornar uma mensagem genérica ou personalizada.
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o adotante.",
      };
    }
  }

  async atualizaEnderecoAdotante(
    idAdotante: number,
    endereco: Endereco
  ): Promise<{ success: boolean; message?: string }> {

    const adotante = await this.repository.findOne({
      where: { id: idAdotante },
    });

    if (!adotante) {
      return { success: false, message: "Adotante não encontrado" };
    }
    const novoEndereco = new Endereco(endereco.cidade, endereco.estado);
    adotante.endereco = novoEndereco;
    await this.repository.save(adotante);
    return { success: true, message: "Endereço de adotante atualizado com sucesso." };
  }
}
