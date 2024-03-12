import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import Pet from "../entities/Pet";
import EnumPorte from "../enum/EnumPorte";

export default class PetController {

  constructor(private petRepository: PetRepository) {}

  criaPet(request: Request, response: Response) {
    const {nome, especie, adotado, dataNascimento, porte} = <Pet>request.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return response.status(400).json({ erro: 'Espécie inválida.' });
    }
    if (porte && !(porte in EnumPorte)) {
      return response.status(400).json({ erro: 'Porte de pet inválido.' });
    }

    const novoPet = new Pet(nome, especie, dataNascimento, adotado, porte);

    this.petRepository.criaPet(novoPet);
    return response.status(201).json(novoPet);
  }

  async listaPets(req: Request, res: Response) {
    const listaDePets = await this.petRepository.listaPet();
    return res.status(200).json(listaDePets);
  }

  async atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.petRepository.atualizaPet(Number(id), req.body as Pet);

    this.emiteMensagem(res, success, message);
  }

  async deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.petRepository.deletaPet(Number(id));

    this.emiteMensagem(res, success, message);
  }

  async adotaPet(req: Request, res: Response) {
    const { pet_id, id_adotante } = req.params;
    const { success, message } = await this.petRepository.adotaPet(
      Number(pet_id),
      Number(id_adotante)
    );
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(204);
  }

  emiteMensagem(res: Response, success: boolean, message?: string) {
    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json({ mensagem: message });
  }

  async buscaPetPeloPorte(req: Request, res: Response) {
    const { porte } = req.query;
    const listaDePets = await this.petRepository.buscaPeloPorte(porte as EnumPorte);
    if (!listaDePets.length) {
      return res.status(200).json({ message: `Nenhum pet encontrado para o porte ${porte}` });
    }
    return res.status(200).json(listaDePets);
  }

  async buscaPetPorCampoGenerico(req: Request, res: Response) {
    const { campo, valor } = req.query;
    const listaDePets = await this.petRepository.buscaPorCampoGenerico(
      campo as keyof Pet,
      valor as string
    );
    return res.status(200).json(listaDePets);
  }
}
