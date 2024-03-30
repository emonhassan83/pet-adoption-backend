import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { adoptionRequestController } from "./adoption.controller";
import { adoptionRequestSchema } from "./adoption.validation";

const router = express.Router();

router.post(
    '/adoption-request',
    auth(),
    validateRequest(adoptionRequestSchema.createAdoptionRequest),
    adoptionRequestController.createAdoptionRequest
  );

router.get(
    '/adoption-requests',
    auth(),
    adoptionRequestController.getAllAdoptionRequest
  );

router.put(
    '/adoption-requests/:requestId',
    auth(),
    validateRequest(adoptionRequestSchema.updateAdoptionRequest),
    adoptionRequestController.updateAAdoptionRequest
  );

export const adoptionRequestRoutes = router;