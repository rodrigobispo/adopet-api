import express, { RequestHandler } from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../db/data-source';
import AdotanteController from '../controller/AdotanteController';
import { middlewareValidadorBodyAdotante } from '../middleware/validators/adotanteRequestBody';
import { middlewareValidadorBodyEndereco } from '../middleware/validators/enderecoRequestBody';

const router = express.Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("Adotante"));
const adotanteController = new AdotanteController(adotanteRepository);
const validateBodyAdotante: RequestHandler = (req, res, next) => middlewareValidadorBodyAdotante(req, res, next);
const validateBodyEndereco: RequestHandler = (req, res, next) => middlewareValidadorBodyEndereco(req, res, next);

router.post("/", validateBodyAdotante, (req, res) => adotanteController.criaAdotante(req, res));
router.get("/", (req, res) => adotanteController.listaAdotantes(req, res));
router.put("/:id", (req, res) => adotanteController.atualizaAdotante(req, res));
router.delete("/:id", (req, res) => adotanteController.deletaAdotante(req, res));
router.patch("/:id", middlewareValidadorBodyEndereco, (req, res) => adotanteController.atualizaEnderecoAdotante(req, res));

export default router;
