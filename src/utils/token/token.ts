import jwt from "jsonwebtoken";

const chaveSecreta = "chaveSuperSecreta";

const token = jwt.sign(
  {
    apelido: "nick",
    profissao: "engenheiro de software"
  }, chaveSecreta
);
console.log("chave codificada");
console.log("composição do token: header, payload (dados), assinatura");
console.log(token);

const tokenDecodificado = jwt.verify(token, chaveSecreta);

console.log("chave decodificada:");
console.log(tokenDecodificado);
