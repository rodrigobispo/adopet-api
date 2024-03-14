import Adotante from "../entities/Adotante";

type TipoRequestBodyAdotante = Omit<Adotante, "id" | "pets">;
type TipoRequestParamsAdotante = { id?: string };
type TipoResponseBodyAdotante = {
  dados?:
    | Pick<Adotante, "id" | "nome" | "celular" | "endereco">
    | Pick<Adotante, "id" | "nome" | "celular" | "endereco">[];
  erros?: unknown;
};

export {
  TipoRequestBodyAdotante,
  TipoResponseBodyAdotante,
  TipoRequestParamsAdotante
};
