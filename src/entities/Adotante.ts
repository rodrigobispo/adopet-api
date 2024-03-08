import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

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
  @Column()
  foto: string;
  @Column()
  endereco: string;

  constructor(
    nome: string,
    senha: string,
    celular: string,
    foto: string,
    endereco: string
  ) {
    this.nome = nome;
    this.senha = senha;
    this.foto = foto;
    this.celular = celular;
    this.endereco = endereco;
  }
}

export default Adotante;
