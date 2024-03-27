import { User } from "@prisma/client";
import { Request } from "express";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";

interface UserData {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }

const createUser = async (req: Request): Promise<UserData> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  const result: User = await prisma.user.create({
    data: userData,
  });
  const { password: _, ...userDataWithoutPassword } = result;

  return userDataWithoutPassword;
};

export const userService = {
  createUser,
};
