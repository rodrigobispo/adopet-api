import { Request, Response } from "express";
import Adotante from "../entities/Adotante";
import AdotanteRepository from "../repositories/AdotanteRepository";
import Endereco from "../entities/Endereco";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante
} from "../tipos/tiposAdotante";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<{}, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { nome, celular, endereco, foto, senha } = <Adotante>req.body;

    const novoAdotante = new Adotante(
      nome,
      senha,
      celular,
      foto,
      endereco
    );
    await this.repository.criaAdotante(novoAdotante);
    return res.status(201).json({ data: { id: novoAdotante.id, nome, celular } });
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
    ) {
    const { id } = req.params;
    const { success, message } = await this.repository.atualizaAdotante(
      Number(id),
      req.body as Adotante
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }

    return res.status(201).json({ error: message });
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    return res.json(listaDeAdotantes);
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.deletaAdotante(
      Number(id)
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.status(201).json({ error: message });
  }

  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    const { id } = req.params;

    const { success, message } = await this.repository.atualizaEnderecoAdotante(
      Number(id),
      req.body as Endereco
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.status(201).json({ error: message });
  }
}
