import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { blogController } from "./blog.controller";
import { blogValidation } from "./blog.validation";

const router = express.Router();

router.post(
  "/add-blog",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(blogValidation.createBlogSchema),
  blogController.createBlog
);

router.get("/", blogController.getAllBlogs);

router.get("/my-blogs", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), blogController.getMyBlogs);

router.get(
  "/:blogId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.USER),
  blogController.getABlog
);

router.put(
  "/:blogId",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  validateRequest(blogValidation.updateBlogSchema),
  blogController.updateABlog
);

router.delete("/:blogId", auth(UserRole.SUPER_ADMIN, UserRole.ADMIN), blogController.deleteABlog);

export const blogRoutes = router;
