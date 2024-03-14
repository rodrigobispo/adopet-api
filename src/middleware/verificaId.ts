import { NextFunction, Request, Response } from "express";
import { RequisicaoRuim } from "../utils/manipulacaoDeErros";

export const verificaIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params = { ...req.params };
    for (const param in params) {
      if (!Number.isInteger(Number(params[param]))) {
        throw new RequisicaoRuim(`O parâmetro ${param} deve ser um número inteiro.`);
      }
    }
  } catch (error) {
    const exception = error as RequisicaoRuim;
    return res.status(exception.statusCode).json({ error: exception.message });
  }
};
