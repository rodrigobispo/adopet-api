import express from 'express';
import PetController from '../controller/PetController';
import PetRepository from '../repositories/PetRepository';
import { AppDataSource } from '../db/data-source';
import { middlewareValidadorBodyPet } from '../middleware/validators/petRequestBody';
import { verificaIdMiddleware } from '../middleware/verificaId';

const router = express.Router();

const petRepository = new PetRepository(
  AppDataSource.getRepository("Pet"),
  AppDataSource.getRepository("Adotante")
);
const petController = new PetController(petRepository);

router.post("/", middlewareValidadorBodyPet, (req, res) => petController.criaPet(req, res))
  .put("/:id", verificaIdMiddleware, (req, res) => petController.atualizaPet(req, res))
  .delete("/:id", verificaIdMiddleware, (req, res) => petController.deletaPet(req, res))
  .get("/", (req, res) => petController.listaPets(req, res))
  .put("/:pet_id/:id_adotante", verificaIdMiddleware, (req, res) => petController.adotaPet(req, res))
  .get("/filtroPorte", (req, res) => petController.buscaPetPeloPorte(req, res))
  .get("/filtro", (req, res) => petController.buscaPetPorCampoGenerico(req, res));

export default router;
