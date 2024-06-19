import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { commentValidation } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(commentValidation.createCommentSchema),
  commentController.createComment
);

router.get("/", commentController.getAllComment);

router.get("/my-comments", auth(UserRole.ADMIN), commentController.getMyComments);

router.get(
  "/:commentId",
  auth(UserRole.ADMIN, UserRole.USER),
  commentController.getAComment
);

router.put(
  "/:commentId",
  auth(UserRole.ADMIN),
  validateRequest(commentValidation.updateCommentSchema),
  commentController.updateAComment
);

router.delete("/:commentId", auth(UserRole.ADMIN), commentController.deleteAComment);

export const commentRoutes = router;
