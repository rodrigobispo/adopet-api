import { createHash } from "crypto";

const criaSenhaCriptografada = (senha: string) => {
  return createHash('sha256').update(senha).digest('hex');
}

export default criaSenhaCriptografada;
