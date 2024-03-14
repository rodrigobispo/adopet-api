import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Endereco from "./Endereco";
import criaSenhaCriptografada from "../utils/senhaCriptografada";
import Pet from "./Pet";

@Entity()
export default class Abrigo {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  nome: string;
  @Column({ unique: true })
  email: string;
  @Column()
  celular: string;
  @Column()
  senha: string;
  @OneToOne(() => Endereco, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  endereco?: Endereco;
  @OneToMany(() => Pet, (pet) => pet.abrigo)
  pets!: Pet[];

  constructor(
    nome: string,
    celular: string,
    email: string,
    senha: string,
    endereco?: Endereco
  ) {
    this.nome = nome;
    this.celular = celular;
    this.email = email;
    this.senha = senha;
    this.endereco = endereco;
  }
  @BeforeInsert()
  @BeforeUpdate()
  private async criptografarSenha() {
    if (this.senha) {
      this.senha = criaSenhaCriptografada(this.senha);
    }
  }
}
