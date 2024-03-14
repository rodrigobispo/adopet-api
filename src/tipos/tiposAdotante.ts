import Adotante from "../entities/Adotante";

type TipoRequestBodyAdotante = Omit<Adotante, "id" | "pets">;
type TipoRequestParamsAdotante = { id?: string };
type TipoResponseBodyAdotante = {
  data?:
    | Pick<Adotante, "id" | "nome" | "celular" | "endereco">
    | Pick<Adotante, "id" | "nome" | "celular" | "endereco">[];
  error?: unknown;
};

export {
  TipoRequestBodyAdotante,
  TipoResponseBodyAdotante,
  TipoRequestParamsAdotante
};