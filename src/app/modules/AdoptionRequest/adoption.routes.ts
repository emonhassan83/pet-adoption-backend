import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { adoptionRequestController } from "./adoption.controller";
import { adoptionRequestSchema } from "./adoption.validation";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(adoptionRequestSchema.createAdoptionRequest),
  adoptionRequestController.createAdoptionRequest
);

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.USER),
  adoptionRequestController.getAllAdoptionRequest
);

router.get(
  "/my-adoption",
  auth(UserRole.ADMIN, UserRole.USER),
  adoptionRequestController.getMyAdoptionRequest
);

router.put(
  "/:requestId",
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(adoptionRequestSchema.updateAdoptionRequest),
  adoptionRequestController.updateAAdoptionRequest
);

router.delete(
  "/:requestId",
  auth(UserRole.ADMIN, UserRole.USER),
  adoptionRequestController.deleteAAdoptionRequest
);

export const adoptionRequestRoutes = router;
