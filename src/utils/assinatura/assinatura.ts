import * as crypto from "crypto";

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,

  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

let dados = "Essa string será assinada!";

// Assinatura
const assinador = crypto.createSign('rsa-sha256');
assinador.update(dados);

const assinatura = assinador.sign(privateKey, 'hex');

console.log(`Assinatura digital:
${assinatura}`);

// dados += '.';

// Envio desse documento -------- Doc, assinatura e chave pública.

const verificador = crypto.createVerify('rsa-sha256');
verificador.update(dados);
const ehVerificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(ehVerificado ? "foi validado" : "doc inválido");