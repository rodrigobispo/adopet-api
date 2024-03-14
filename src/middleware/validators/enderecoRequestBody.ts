import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import Endereco from "../../entities/Endereco";

const esquemaBodyEndereco: yup.ObjectSchema<Omit<Endereco, "id">> = yup.object({
  cidade: yup.string().defined().required(),
  estado: yup.string().defined().required(),
});

const middlewareValidadorBodyEndereco = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await esquemaBodyEndereco.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    const yupErrors = error as yup.ValidationError;

    const validationErrors: Record<string, string> = {};

    yupErrors.inner.forEach((error) => {
      if (error.path) validationErrors[error.path] = error.message;
    });

    return res.status(500).json({ error: validationErrors });
  }
}

export { middlewareValidadorBodyEndereco }
