import { Pet, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { IPaginationOptions, IPet, IUser } from "../../interfaces";
import { petSearchAbleFields } from "./pet.constant";

const createPetIntoDB = async (
  userData: IUser,
  petData: IPet
): Promise<Pet> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.pet.create({
    data: petData,
  });

  return result;
};

//! todo filter option added
const getAllPetsFromDB = async (params: any, options: IPaginationOptions) => {
  console.log(params);
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.PetWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: petSearchAbleFields.map((field) => ({
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

  const whereConditions: Prisma.PetWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  // console.dir(whereConditions, {depth: Infinity});

  const result = await prisma.pet.findMany({
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
  });

  const total = await prisma.pet.count({
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

const updateIntoDB = async (
  userData: IUser,
  petId: string,
  data: Partial<Pet>
): Promise<Pet> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id: petId,
    },
    data,
  });

  return result;
};

const deleteIntoDB = async (userData: IUser, petId: string): Promise<Pet> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.pet.delete({
    where: {
      id: petId,
    },
  });

  return result;
};

export const PetService = {
  createPetIntoDB,
  getAllPetsFromDB,
  updateIntoDB,
  deleteIntoDB,
};
