import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Endereco from "./Endereco";
import Pet from "./Pet";

@Entity()
class Adotante {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column()
  senha: string;
  @Column()
  celular: string;
  @Column({ nullable: true })
  foto?: string;

  @OneToOne(() => Endereco, { nullable: true, cascade: true, eager: true })
  @JoinColumn()
  endereco?: Endereco;

  @OneToMany(() => Pet, (pet) => pet.adotante)
  pets!: Pet;

  constructor(
    nome: string,
    senha: string,
    celular: string,
    foto?: string,
    endereco?: Endereco
  ) {
    this.nome = nome;
    this.senha = senha;
    this.foto = foto;
    this.celular = celular;
    this.endereco = endereco;
  }
}

export default Adotante;
