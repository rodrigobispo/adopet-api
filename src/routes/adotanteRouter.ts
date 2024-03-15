import express from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../db/data-source';
import AdotanteController from '../controller/AdotanteController';
import { middlewareValidadorBodyAdotante } from '../middleware/validators/adotanteRequestBody';
import { middlewareValidadorBodyEndereco } from '../middleware/validators/enderecoRequestBody';
import { verificaIdMiddleware } from '../middleware/verificaId';

const router = express.Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("Adotante"));
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", middlewareValidadorBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/:id", verificaIdMiddleware, middlewareValidadorBodyAdotante, (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", verificaIdMiddleware, (req, res) => adotanteController.deletaAdotante(req, res));
router.patch("/:id", verificaIdMiddleware, middlewareValidadorBodyEndereco, (req, res) => adotanteController.atualizaEnderecoAdotante(req, res));

export default router;
