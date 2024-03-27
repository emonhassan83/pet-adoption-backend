import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { petValidation } from "./pet.validation";
import { petController } from "./pet.controller";

const router = express.Router();

router.post(
  "/",
  auth(),
  validateRequest(petValidation.createPet),
  petController.createPet
);

router.get("/", auth(), petController.getAllPets);

router.put(
  "/:petId",
  auth(),
  validateRequest(petValidation.updatePet),
  petController.updateAPet
);

export const petRoutes = router;
