import { Prisma, User, UserRole, UserStatus } from "@prisma/client";
import { Request } from "express";
import bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { userSearchAbleFields } from "./user.constant";
import { IPaginationOptions, IUser, IUserData } from "../../interfaces";
import { paginationHelper } from "../../../helpers/paginationHelper";

const createUser = async (req: Request): Promise<IUserData> => {
  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    role: UserRole.USER
  };

  const result: User = await prisma.user.create({
    data: userData,
  });
  const { password: _, ...userDataWithoutPassword } = result;

  return userDataWithoutPassword;
};

const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "asc",
          },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      role: true,
      isDeleted: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      adoptionRequest: true,
      pet: true 
    },
  });

  const total = await prisma.user.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getMyProfileFromDB = async (
  userData: IUser
): Promise<IUserData | null> => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false
    },
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      role: true,
      isDeleted: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      adoptionRequest: true,
      pet: true 
    },
  });

  return result;
};

const updateProfileIntoDB = async (
  userData: IUser,
  data: Partial<User>
): Promise<IUserData> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      
    },
  });

  const result = await prisma.user.update({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE
    },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      role: true,
      isDeleted: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      adoptionRequest: true,
      pet: true,
    },
  });

  return result;
};

const changeUserRole = async (id: string, role: UserRole) => {
   await prisma.user.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
      status: UserStatus.ACTIVE
    },
  });

  const updateUserRole = await prisma.user.update({
    where: {
      id,
    },
    data: role,
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      role: true,
      isDeleted: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      adoptionRequest: true,
      pet: true,
    },
  });

  return updateUserRole;
};

const changeUserStatus = async (id: string, status: UserStatus) => {
   await prisma.user.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
      status: UserStatus.ACTIVE
    },
  });

  const updateUserStatus = await prisma.user.update({
    where: {
      id,
    },
    data: status,
    select: {
      id: true,
      name: true,
      email: true,
      profilePhoto: true,
      role: true,
      isDeleted: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      adoptionRequest: true,
      pet: true,
    },
  });

  return updateUserStatus;
};

export const userService = {
  createUser,
  getAllFromDB,
  getMyProfileFromDB,
  updateProfileIntoDB,
  changeUserRole,
  changeUserStatus
};
