import express from 'express';
import AdotanteRepository from '../repositories/AdotanteRepository';
import { AppDataSource } from '../db/data-source';
import AdotanteController from '../controller/AdotanteController';

const router = express.Router();

const adotanteRepository = new AdotanteRepository(AppDataSource.getRepository("Adotante"));
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", (req, res) => adotanteController.criaAdotante(req, res));

export default router;
