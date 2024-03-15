import * as crypto from "crypto";

function criaHashComSal(senha: string) {
  const sal = crypto.randomBytes(16).toString('hex');
  const senhaHasheada = crypto.scryptSync(senha, sal, 64).toString('hex');
  return `${sal}:${senhaHasheada}`;
}

class Usuario {
  private login: string;
  private sal: string;
  private hash: string;

  constructor(login: string, senha: string) {
    this.login = login;
    [this.sal, this.hash] = criaHashComSal(senha).split(':');
  }
  autentica(login: string, senha: string) {
    if (this.login === login) {
      const testeHash = crypto.scryptSync(senha, this.sal, 64);
      const hashRealDoUsuario = Buffer.from(this.hash, 'hex');

      const hashesCorrespondem = crypto.timingSafeEqual(testeHash, hashRealDoUsuario);

      if (hashesCorrespondem) {
        console.log("Usuário autenticado com sucesso!");
        return true;
      }
    }
    console.log("Usuário ou senha incorretos.");
    return false;
  }
}

const usuario = new Usuario('fulano', 'minhaSenha');
console.log(usuario);

// Teste autenticação sucesso:
usuario.autentica('fulano', 'minhaSenha');
// Teste autenticação inválida:
usuario.autentica('fulano', 'minhasenha');