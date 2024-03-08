import { Request, Response } from "express";
import Adotante from "../entities/Adotante";
import AdotanteRepository from "../repositories/AdotanteRepository";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(req: Request, res: Response) {
    try {
      const { nome, celular, endereco, foto, senha } = <Adotante>req.body;

      const novoAdotante = new Adotante(
        nome,
        senha,
        celular,
        foto,
        endereco
      );

      await this.repository.criaAdotante(novoAdotante);
      return res.status(201).json(novoAdotante);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar o adotante' });
    }
  }
}
