import { Gender, UserRole, UserStatus } from "@prisma/client";

export type IUserData = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePhoto?: string | null;
  contactNumber: string;
  address: string;
  gender?: Gender | null;
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
