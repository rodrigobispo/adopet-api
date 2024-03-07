import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

let listaDePets: TipoPet[] = [];

export default class PetController {
  criaPet(request: Request, response: Response) {
    const {id, nome, especie, adotado, idade} = <TipoPet>request.body;

    const novoPet: TipoPet = {
      id,
      nome,
      especie,
      adotado,
      idade
    };
    listaDePets.push(novoPet);
    return response.status(201).json(novoPet);
  }
}
