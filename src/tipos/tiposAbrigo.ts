import Abrigo from "../entities/Abrigo";

type TipoRequestBodyAbrigo = Omit<Abrigo, "id" | "pets">;

type TipoResponseBodyAbrigo = {
  dados?:
    | Pick<Abrigo, "id" | "nome" | "email" | "celular" | "endereco">
    | Pick<Abrigo, "id" | "nome" | "email" | "celular" | "endereco">[];
  mensagens?: unknown;
};

type TipoRequestParamsAbrigo = {
  id?: string;
};

export {
  TipoRequestBodyAbrigo,
  TipoRequestParamsAbrigo,
  TipoResponseBodyAbrigo,
};
