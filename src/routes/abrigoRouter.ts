import AbrigoController from "../controller/AbrigoController";
import express, { RequestHandler } from 'express';
import AdotanteRepository from '../repositories/AbrigoRepository';
import { AppDataSource } from '../db/data-source';
import { middlewareValidadorBodyAbrigo } from "../middleware/validators/abrigoRequestBody";
import { middlewareValidadorBodyEndereco } from "../middleware/validators/enderecoRequestBody";
import { verificaIdMiddleware } from "../middleware/verificaId";

const router = express.Router();

const abrigoRepository = new AdotanteRepository(AppDataSource.getRepository("Abrigo"));
const abrigoController = new AbrigoController(abrigoRepository);

const validateAbrigoBody: RequestHandler = (req, res, next) => middlewareValidadorBodyAbrigo(req, res, next);

router.post("/", validateAbrigoBody, (req, res) => abrigoController.criaAbrigo(req, res));
router.get("/", (req, res) => abrigoController.listaAbrigos(req, res));
router.put("/:id", verificaIdMiddleware, validateAbrigoBody, (req, res) => abrigoController.atualizaAbrigo(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => abrigoController.deletaAbrigo(req, res));
router.patch("/:id", verificaIdMiddleware, middlewareValidadorBodyEndereco,
  (req, res) => abrigoController.atualizaEnderecoAbrigo(req, res)
);

export default router;
