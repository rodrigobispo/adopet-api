import { Request, Response } from "express";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import Pet from "../entities/Pet";
import EnumPorte from "../enum/EnumPorte";
import { TipoRequestBodyPet, TipoRequestParamsPet, TipoResponseBodyPet } from "../tipos/tiposPet";

export default class PetController {

  constructor(private petRepository: PetRepository) {}

  async criaPet(
    req: Request<TipoRequestParamsPet, TipoRequestBodyPet, {}>,
    res: Response<TipoResponseBodyPet>
  ) {
    const {nome, especie, adotado, dataNascimento, porte} = <Pet>req.body;

    if (!Object.values(EnumEspecie).includes(especie)) {
      return res.status(400).json({ mensagens: 'Espécie inválida.' });
    }
    if (porte && !(porte in EnumPorte)) {
      return res.status(400).json({ mensagens: 'Porte de pet inválido.' });
    }

    const novoPet = new Pet(nome, especie, dataNascimento, adotado, porte);

    const petCriado = await this.petRepository.criaPet(novoPet);
    return res.status(201).json({ dados: { id: petCriado.id, nome, especie, porte } });
  }

  async listaPets(
    req: Request<TipoRequestParamsPet, TipoRequestBodyPet, {}>,
    res: Response<TipoResponseBodyPet>
  ) {
    const listaDePets = await this.petRepository.listaPet();
    const data = listaDePets.map((pet) => {
      return {
        id: pet.id,
        nome: pet.nome,
        especie: pet.especie,
        porte: pet.porte
      }
    });
    return res.status(200).json({ dados: data });
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
