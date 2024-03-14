import Pet from "../entities/Pet";

type TipoRequestBodyPet = Omit<Pet, "id">;
type TipoRequestParamsPet = { id?: string };
type TipoResponseBodyPet = {
  dados?:
    | Pick<Pet, "id" | "nome" | "porte" | "especie">
    | Pick<Pet, "id" | "nome" | "porte" | "especie">[],
  mensagens?: unknown
};

export {
  TipoRequestBodyPet,
  TipoResponseBodyPet,
  TipoRequestParamsPet
};
