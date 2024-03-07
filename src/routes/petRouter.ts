import express from 'express';
import PetController from '../controller/PetController';

const router = express.Router();

const petController = new PetController();

router.post("/", petController.criaPet)
  .put("/:id", petController.atualizaPet)
  .delete("/:id", petController.deletaPet)
  .get("/", petController.listaPets)
;

export default router;
