import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import Endereco from "../../entities/Endereco";
import { pt } from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/tratarValidacaoYup";

const esquemaBodyEndereco: yup.ObjectSchema<Omit<Endereco, "id">> = yup.object({
  cidade: yup.string().defined().required(),
  estado: yup.string().defined().required(),
});

yup.setLocale(pt);

const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
  tratarErroValidacaoYup(esquemaBodyEndereco, req, res, next);
}

export { middlewareValidadorBodyEndereco };
