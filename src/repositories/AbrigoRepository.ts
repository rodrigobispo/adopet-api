import { Repository } from "typeorm";
import Abrigo from "../entities/Abrigo";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulacaoDeErros";
import Endereco from "../entities/Endereco";

export default class AbrigoRepository {
  constructor(private repository: Repository<Abrigo>) { }

  private async existeAbrigoComCelular(celular: string): Promise<boolean> {
    return !!(await this.repository.findOne({ where: { celular } }));
  }
  private async existeAbrigoComEmail(email: string): Promise<boolean> {
    return !!(await this.repository.findOne({ where: { email } }));
  }

  async criaAbrigo(abrigo: Abrigo): Promise<void> {
    if (
      (await this.existeAbrigoComCelular(abrigo.celular)) ||
      (await this.existeAbrigoComEmail(abrigo.email))
    ) {
      throw new RequisicaoRuim("Já existe um abrigo com esse celular ou e-mail!");
    }
    await this.repository.save(abrigo);
  }

  async listaAbrigos(): Promise<Abrigo[]> {
    return await this.repository.find();
  }

  async atualizaAbrigo(id: number, newData: Abrigo) {
    const abrigoToUpdate = await this.repository.findOne({ where: { id } });

    if (!abrigoToUpdate) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }

    Object.assign(abrigoToUpdate, newData);

    await this.repository.save(abrigoToUpdate);
  }

  async deletaAbrigo(id: number) {
    const abrigoToRemove = await this.repository.findOne({ where: { id } });
    if (!abrigoToRemove) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }
    await this.repository.remove(abrigoToRemove);
  }

  async atualizaEnderecoAbrigo(idAbrigo: number, endereco: Endereco) {
    const abrigo = await this.repository.findOne({
      where: { id: idAbrigo },
    });

    if (!abrigo) {
      throw new NaoEncontrado("Abrigo não encontrado!");
    }

    const novoEndereco = new Endereco(endereco.cidade, endereco.estado);
    abrigo.endereco = novoEndereco;
    await this.repository.save(abrigo);
  }

}
