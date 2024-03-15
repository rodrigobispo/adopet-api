import { Request, Response } from "express";
import AbrigoRepository from "../repositories/AbrigoRepository";
import { TipoRequestBodyAbrigo, TipoRequestParamsAbrigo, TipoResponseBodyAbrigo } from "../tipos/tiposAbrigo";
import Abrigo from "../entities/Abrigo";
import { EnumHttpStatusCode } from "../enum/EnumHttpStatusCode";
import Endereco from "../entities/Endereco";
import { NaoEncontrado, RequisicaoRuim } from "../utils/manipulacaoDeErros";

export default class AbrigoController {
  constructor(private repository: AbrigoRepository) { }

  async criaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const { nome, celular, email, senha, endereco } = req.body;
    const novoAbrigo = new Abrigo(nome, celular, email, senha, endereco);

    await this.repository.criaAbrigo(novoAbrigo);
    return res.status(201)
      .json({ dados: { id: novoAbrigo.id, nome, celular, email, endereco } });
  }

  async listaAbrigos(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    const listaDeAbrigos = await this.repository.listaAbrigos();
    const dados = listaDeAbrigos.map((abrigo) => {
      return {
        id: abrigo.id,
        nome: abrigo.nome,
        celular: abrigo.celular,
        email: abrigo.email,
        endereco: abrigo.endereco !== null ? abrigo.endereco : undefined,
      };
    });
    return res.status(EnumHttpStatusCode.OK).json({ dados });
  }

  async atualizaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    try {
      const { id } = req.params;
      await this.repository.atualizaAbrigo(Number(id), req.body as Abrigo);

      return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    } catch (error) {
      const exception = error as NaoEncontrado | RequisicaoRuim;
      return res.status(exception.statusCode).json({ mensagens: exception.message });
    }
  }

  async deletaAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, TipoRequestBodyAbrigo>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    try {
      const { id } = req.params;

      await this.repository.deletaAbrigo(Number(id));

      return res.sendStatus(EnumHttpStatusCode.NO_CONTENT);
    } catch (error) {
      const exception = error as RequisicaoRuim | NaoEncontrado;
      return res.status(exception.statusCode).json({ mensagens: exception.message })
    }
  }

  async atualizaEnderecoAbrigo(
    req: Request<TipoRequestParamsAbrigo, {}, Endereco>,
    res: Response<TipoResponseBodyAbrigo>
  ) {
    try {
      const { id } = req.params;
      await this.repository.atualizaEnderecoAbrigo(Number(id), req.body);
      return res.sendStatus(EnumHttpStatusCode.OK);
    } catch (error) {
      const exception = error as RequisicaoRuim | NaoEncontrado;
      return res.status(exception.statusCode).json({ mensagens: exception.message })
    }
  }

}
