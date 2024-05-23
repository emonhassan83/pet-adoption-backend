import { UserRole, UserStatus } from "@prisma/client";

export type IUserData = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type IUser = {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
};
