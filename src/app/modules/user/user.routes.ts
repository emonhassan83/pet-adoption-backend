import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
    '/register',
    validateRequest(userValidation.createUser),
    userController.createUser
  );

  router.get(
    '/users',
    // auth(),
    userController.getAllFromDB
  );

  router.get(
    '/profile',
    auth(),
    userController.getMyProfile
  );

  router.put(
    '/profile',
    auth(),
    validateRequest(userValidation.updateUser),
    userController.updateMyProfile
  );

export const userRoutes = router;