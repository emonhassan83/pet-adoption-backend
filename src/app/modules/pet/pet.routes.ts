import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { petValidation } from "./pet.validation";
import { petController } from "./pet.controller";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(petValidation.createPet),
  petController.createPet
);

router.get("/", petController.getAllPets);

router.put(
  "/:petId",
  auth(UserRole.ADMIN),
  validateRequest(petValidation.updatePet),
  petController.updateAPet
);

export const petRoutes = router;
