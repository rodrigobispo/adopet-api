import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EnumEspecie from "../enum/EnumEspecie";
import Adotante from "./Adotante";
import EnumPorte from "../enum/EnumPorte";
import Abrigo from "./Abrigo";

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
  @Column({ nullable: true })
  porte?: EnumPorte
  @ManyToOne(() => Abrigo, (abrigo) => abrigo.pets)
  abrigo!: Abrigo;

  constructor(nome: string,
    especie: EnumEspecie,
    dataNascimento: Date,
    adotado: boolean,
    porte?: EnumPorte
  ) {
    this.nome = nome;
    this.especie = especie;
    this.dataNascimento = dataNascimento;
    this.adotado = adotado;
    this.porte = porte;
  }
}

export default Pet;
