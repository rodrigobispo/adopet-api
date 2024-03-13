import Pet from "../entities/Pet";

type TipoRequestBodyPet = Omit<Pet, "id">;
type TipoRequestParamsPet = { id?: string };
type TipoResponseBodyPet = {
  data?:
    | Pick<Pet, "id" | "nome" | "porte" | "especie">
    | Pick<Pet, "id" | "nome" | "porte" | "especie">[],
  message?: unknown
};

export {
  TipoRequestBodyPet,
  TipoResponseBodyPet,
  TipoRequestParamsPet
};
