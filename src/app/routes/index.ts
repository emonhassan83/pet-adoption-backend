import express from "express";
import { userRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { petRoutes } from "../modules/pet/pet.routes";
import { adoptionRequestRoutes } from "../modules/AdoptionRequest/adoption.routes";
import { blogRoutes } from "../modules/blog/blog.routes";
import { commentRoutes } from "../modules/comment/comment.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/pets",
    route: petRoutes,
  },
  {
    path: "/adoption-requests",
    route: adoptionRequestRoutes,
  },
  {
    path: "/blog",
    route: blogRoutes,
  },
  {
    path: "/comment",
    route: commentRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
