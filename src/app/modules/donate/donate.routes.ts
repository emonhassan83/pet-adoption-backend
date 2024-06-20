import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { donateController } from "./donate.controller";
import { donationValidation } from "./donate.validation";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(donationValidation.createDonationSchema),
  donateController.createDonation
);

router.get("/", donateController.getAllDonation);

router.get(
  "/user-donations",
  auth(UserRole.ADMIN),
  donateController.getDonationsByUser
);

router.get(
  "/pet-donations",
  auth(UserRole.ADMIN),
  donateController.getDonationsByPet
);

router.get(
  "/:donateId",
  auth(UserRole.ADMIN, UserRole.USER),
  donateController.getADonation
);

router.put(
  "/:donateId",
  auth(UserRole.ADMIN),
  validateRequest(donationValidation.updateDonationSchema),
  donateController.updateADonate
);

router.delete(
  "/:donateId",
  auth(UserRole.ADMIN),
  donateController.deleteADonate
);

export const donateRoutes = router;
