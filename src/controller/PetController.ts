import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

let listaDePets: TipoPet[] = [];
let id = 0;
function geraId() {
  return id++;
}
export default class PetController {
  criaPet(request: Request, response: Response) {
    const {nome, especie, adotado, idade} = <TipoPet>request.body;

    const novoPet: TipoPet = {
      id: geraId(),
      nome,
      especie,
      adotado,
      idade
    };
    listaDePets.push(novoPet);
    return response.status(201).json(novoPet);
  }

  listaPets(req: Request, res: Response) {
    return res.status(200).json(listaDePets);
  }

  atualizaPet(req: Request, res: Response) {
    const { id } = req.params;
    const { adotado, especie, idade, nome } = req.body as TipoPet;
    const pet = listaDePets.find((pet) => pet.id === Number(id));

    if (!pet) {
      return res.status(404).json({ erro: 'Pet não encontrado.' });
    }
    pet.nome = nome;
    pet.idade = idade;
    pet.especie = especie;
    pet.adotado = adotado;

    return res.status(200).json(pet);
  }

  deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    const pet = listaDePets.find((pet) => pet.id === Number(id));
    if (!pet) {
      return res.status(404).json({ erro: 'Pet não encontrado.' });
    }
    const index = listaDePets.indexOf(pet);
    listaDePets.splice(index, 1);
    return res.status(200).json({ mensagem: 'Pet deletado com sucesso.' });
  }
}
