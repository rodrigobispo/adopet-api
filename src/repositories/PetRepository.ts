import { Repository } from "typeorm";
import Pet from "../entities/Pet";
import Adotante from "../entities/Adotante";
import EnumPorte from "../enum/EnumPorte";

class PetRepository {
  private petRepository: Repository<Pet>;
  private adotanteRepository: Repository<Adotante>;

  constructor(petRepository: Repository<Pet>, adotanteRepository: Repository<Adotante>) {
    this.petRepository = petRepository;
    this.adotanteRepository = adotanteRepository;
  }

  async criaPet(pet: Pet): Promise<Pet> {
    return this.petRepository.save(pet);
  }

  async listaPet(): Promise<Pet[]> {
    return this.petRepository.find();
  }

  async atualizaPet(id: number, pet: Pet)
    : Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.petRepository.findOneBy({ id: id });
      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado."};
      }
      Object.assign(petToUpdate, pet);
      await this.petRepository.save(petToUpdate);
      return {
        success: true,
        message: "Pet atualizado com sucesso!"
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Ocorreu um erro ao tentar atualizar o pet.",
      }
    }

  }

  async deletaPet(id: number): Promise<{ success: boolean; message?: string }> {
    try {
      const petToRemove = await this.petRepository.findOne({ where: { id } });

      if (!petToRemove) {
        return { success: false, message: "Pet não encontrado" };
      }
      const nomeDoPet = petToRemove.nome;
      await this.petRepository.remove(petToRemove);

      return { success: true, message: `Pet ${nomeDoPet} removido com sucesso.` };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o pet.",
      };
    }
  }

  async adotaPet(
    idPet: number,
    idAdotante: number
  ): Promise<{ success: boolean; message?: string }> {
    const pet = await this.petRepository.findOne({ where: { id: idPet } });
    if (!pet) {
      return { success: false, message: "Pet não encontrado" };
    }

    const adotante = await this.adotanteRepository.findOne({
      where: { id: idAdotante },
    });
    if (!adotante) {
      return { success: false, message: "Adotante não encontrado" };
    }

    pet.adotante = adotante;
    pet.adotado = true;
    await this.petRepository.save(pet);
    return { success: true };
  }

  async buscaPeloPorte(porte: EnumPorte): Promise<Pet[]> {
    const pets = await this.petRepository.find({ where: { porte } });
    return pets;
  }

  async buscaPorCampoGenerico<Tipo extends keyof Pet>(
    campo: Tipo, valor: Pet[Tipo]
  ): Promise<Pet[]> {
    const pets = await this.petRepository.find({ where: {[campo]: valor} });
    return pets;
  }
}

export default PetRepository;
