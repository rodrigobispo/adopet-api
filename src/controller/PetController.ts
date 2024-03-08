import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import Pet from "../entities/Pet";

export default class PetController {

  constructor(private repository: PetRepository) {}

  criaPet(request: Request, response: Response) {
    const {nome, especie, adotado, dataNascimento} = <Pet>request.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return response.status(400).json({ erro: 'Espécie inválida.' });
    }

    const novoPet = new Pet(nome, especie, dataNascimento, adotado);

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

    this.emiteMensagem(res, success, message);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deletaPet(Number(id));

    this.emiteMensagem(res, success, message);
  }

  emiteMensagem(res: Response, success: boolean, message?: string) {
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json({ mensagem: message });
  }
}
