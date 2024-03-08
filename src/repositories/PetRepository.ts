import { Repository } from "typeorm";
import Pet from "../entities/Pet";

class PetRepository {
  private repository: Repository<Pet>;

  constructor(repository: Repository<Pet>) {
    this.repository = repository;
  }

  criaPet(pet: Pet): void {
    this.repository.save(pet);
  }

  async listaPet(): Promise<Pet[]> {
    return this.repository.find();
  }

  async atualizaPet(id: number, pet: Pet): Promise<{ success: boolean; message?: string }> {
    try {
      const petToUpdate = await this.repository.findOneBy({ id: id });
      if (!petToUpdate) {
        return { success: false, message: "Pet não encontrado."};
      }
      Object.assign(petToUpdate, pet);
      await this.repository.save(petToUpdate);
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
      const petToRemove = await this.repository.findOne({ where: { id } });

      if (!petToRemove) {
        return { success: false, message: "Pet não encontrado" };
      }
      const nomeDoPet = petToRemove.nome;
      await this.repository.remove(petToRemove);

      return { success: true, message: `Pet ${nomeDoPet} removido com sucesso.` };
    } catch (error) {
      return {
        success: false,
        message: "Ocorreu um erro ao tentar excluir o pet.",
      };
    }
  }
}

export default PetRepository;
