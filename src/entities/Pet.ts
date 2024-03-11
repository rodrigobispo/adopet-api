import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import Adotante from "./Adotante";

@Entity()
class Pet {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  especie: EnumEspecie;
  @Column()
  dataNascimento: Date;
  @Column()
  adotado: boolean;

  @ManyToOne(() => Adotante, (adotante) => adotante.pets)
  adotante!: Adotante;

  constructor(nome: string, especie: EnumEspecie, dataNascimento: Date, adotado: boolean) {
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.adotado = adotado;
  }
}

export default Pet;
