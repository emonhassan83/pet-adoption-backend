import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { adoptionRequestController } from "./adoption.controller";
import { adoptionRequestSchema } from "./adoption.validation";

const router = express.Router();

router.post(
    '/',
    auth(),
    validateRequest(adoptionRequestSchema.createAdoptionRequest),
    adoptionRequestController.createAdoptionRequest
  );

export const adoptionRequestRoutes = router;