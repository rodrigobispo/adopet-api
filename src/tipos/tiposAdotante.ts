import Adotante from "../entities/Adotante";

type TipoRequestBodyAdotante = Omit<Adotante, "id">;
type TipoRequestParamsAdotante = { id?: string };
type TipoResponseBodyAdotante = {
  data?: Pick<Adotante, "id" | "nome" | "celular">,
  error?: unknown
};

export {
  TipoRequestBodyAdotante,
  TipoResponseBodyAdotante,
  TipoRequestParamsAdotante
};
