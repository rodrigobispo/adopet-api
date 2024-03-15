import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestBodyAdotante } from "../../tipos/tiposAdotante";
import { pt } from "yup-locale-pt";
import tratarErroValidacaoYup from "../../utils/tratarValidacaoYup";

const numCelularRegexExp = /^(\(?[0-9]{2}\)?)? ?([0-9]{4,5})-?([0-9]{4})$/gm;
const strictPasswordValidatorRegexExp = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm;

yup.setLocale(pt);

const esquemaBodyAdotante: yup.ObjectSchema<Omit<TipoRequestBodyAdotante, "endereco">> = yup.object({
  nome: yup.string().defined().required(),
  celular: yup.string().defined().required().matches(numCelularRegexExp, "número de celular inválido"),
  senha: yup.string().defined().required().min(6).matches(strictPasswordValidatorRegexExp, "senha inválida"),
  foto: yup.string().optional(),
});

const middlewareValidadorBodyAdotante = async (req: Request, res: Response, next: NextFunction) => {
  tratarErroValidacaoYup(esquemaBodyAdotante, req, res, next);
}

export { middlewareValidadorBodyAdotante };
