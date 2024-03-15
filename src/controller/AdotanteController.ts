import { Request, Response } from "express";
import Adotante from "../entities/Adotante";
import AdotanteRepository from "../repositories/AdotanteRepository";
import Endereco from "../entities/Endereco";
import {
  TipoRequestBodyAdotante,
  TipoRequestParamsAdotante,
  TipoResponseBodyAdotante
} from "../tipos/tiposAdotante";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulacaoDeErros";

export default class AdotanteController {
  constructor(private repository: AdotanteRepository) {}

  async criaAdotante(
    req: Request<{}, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
  ) {
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
      return res.status(201).json({ dados: { id: novoAdotante.id, nome, celular, endereco } });
    } catch (error) {
      const exception = error as NaoEncontrado | RequisicaoRuim;
      return res.status(exception.statusCode).json({ erros: exception.message });
    }
  }

  async atualizaAdotante(
    req: Request<TipoRequestParamsAdotante, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
    ) {
    try {
      const { id } = req.params;
      const { message } = await this.repository.atualizaAdotante(
        Number(id),
        req.body as Adotante
      );
      return res.status(201).json({ erros: message });
    } catch (error) {
      const exception = error as NaoEncontrado | RequisicaoRuim;
      return res.status(exception.statusCode).json({ erros: exception.message });
    }
  }

  async listaAdotantes(req: Request, res: Response) {
    const listaDeAdotantes = await this.repository.listaAdotantes();
    const list = listaDeAdotantes.map((adotante) => {
      return {
        id: adotante.id,
        nome: adotante.nome,
        celular: adotante.celular,
        endereco: adotante.endereco !== null ? adotante.endereco : undefined,
        foto: adotante.foto !== null ? adotante.foto : undefined,
      }
    })
    return res.json({ list });
  }

  async deletaAdotante(
    req: Request<TipoRequestParamsAdotante, TipoRequestBodyAdotante, {}>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    try {
      const { id } = req.params;
      const { message } = await this.repository.deletaAdotante(
        Number(id)
      );
      return res.status(201).json({ erros: message });

    } catch (error) {
      const exception = error as NaoEncontrado | RequisicaoRuim;
      return res.status(exception.statusCode).json({ erros: exception.message });
    }
  }

  async atualizaEnderecoAdotante(
    req: Request<TipoRequestParamsAdotante, {}, Endereco>,
    res: Response<TipoResponseBodyAdotante>
  ) {
    try {
      const { id } = req.params;
      const { message } = await this.repository.atualizaEnderecoAdotante(
        Number(id),
        req.body
      );
      return res.status(201).json({ erros: message });
    } catch (error) {
      const exception = error as NaoEncontrado | RequisicaoRuim;
      return res.status(exception.statusCode).json({ erros: exception.message });
    }
  }
}
