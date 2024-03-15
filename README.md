# Projeto adopet-api
Projeto em Typescript que aborda uma API backend sobre adoções de pets.

## Tecnologias e recursos usados
1. **`Express`** para gerenciamento de rotas.
2. Validação com biblioteca **`Yup`**.
3. **`Regex`** em validadores de senha, email...
4. Biblioteca **`crypto`** do Node.js para segurança com criptografia de senha.
5. **`Hooks`** para facilitar a aplicação de operações como a criptografia de senha.
6. Desenvolvimento de tipos para requisições em que há omissão de campos desejados.
7. Middleware para manipulação de erros de forma mais clara e eficiente, aplicado nas rotas, validando entrada de id na url de requisição REST e campos JSON transmitidos (via yup).


## Instalação e execução
Ao entrar na pasta do projeto, digitar o comando:
```
npm install
```
Na pasta do projeto, rodar a aplicação com o comando:
``npm start`` ou ``npm run start``

### Rotas para execução

Os arquivo `/adopet-api/src/routes/index.ts` possui a centralização das rodas do app.
Assim, as requisições da API para GET (listagem) podem ser realizadas por:

 - `http://localhost:3000/pets`
 - `http://localhost:3000/adotantes`
 - `http://localhost:3000/abrigos`

Para os demais métodos (post, put, delete, patch) REST, modificar tais métodos na requisição obedecendo aos formatos de rotas contidos em `/adopet-api/src/routes/`

## Referência
Estudo praticado a apartir do treinamento da Alura: *"TypeScript: desenvolvendo validações e tratando erros"*.
Instrutor: *Emerson Laranja*.
