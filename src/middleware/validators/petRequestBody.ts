import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import { TipoRequestBodyPet } from "../../tipos/tiposPet";
import { pt } from "yup-locale-pt";
import EnumEspecie from "../../enum/EnumEspecie";
import EnumPorte from "../../enum/EnumPorte";
import tratarErroValidacaoYup from "../../utils/tratarValidacaoYup";

yup.setLocale(pt);

const esquemaBodyPet: yup.ObjectSchema<Omit<TipoRequestBodyPet, "adotante" | "abrigo">> = yup.object({
  nome: yup.string().defined().required(),
  especie: yup.string().oneOf(Object.values(EnumEspecie)).defined().required(),
  porte: yup.string().oneOf(Object.values(EnumPorte)),
  dataNascimento: yup.date().defined().required(),
  adotado: yup.boolean().defined().required(),
});

const middlewareValidadorBodyPet = async (req: Request, res: Response, next: NextFunction) => {
  tratarErroValidacaoYup(esquemaBodyPet, req, res, next);
}

export { middlewareValidadorBodyPet };
