import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import Pet from "../entities/Pet";

let id = 0;
function geraId() {
  return id++;
}
export default class PetController {

  constructor(private repository: PetRepository) {}

  criaPet(request: Request, response: Response) {
    const {nome, especie, adotado, dataNascimento} = <Pet>request.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return response.status(400).json({ erro: 'Espécie inválida.' });
    }

    const novoPet = new Pet();
    novoPet.id = geraId();
    novoPet.nome = nome;
    novoPet.especie = especie;
    novoPet.adotado = adotado;
    novoPet.dataNascimento = dataNascimento;

    this.repository.criaPet(novoPet);
    return response.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.repository.listaPet();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaPet(Number(id), req.body as Pet);

    this.emiteMensagem(success, message, res);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));

    this.emiteMensagem(success, message, res);
  }

  emiteMensagem(success: boolean, message: string, res: Response) {
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json({ mensagem: message });
  }
}
