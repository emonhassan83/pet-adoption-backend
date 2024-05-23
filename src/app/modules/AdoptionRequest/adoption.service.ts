import { AdoptionRequest, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAdoptionRequest, IPaginationOptions, IUser } from "../../interfaces";
import { paginationHelper } from "../../../helpers/paginationHelper";

//!TODO: tasting all routes
const createIntoDB = async (
  userData: IUser,
  data: IAdoptionRequest
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: data?.petId,
    },
  });

  const adaptionData = {
    userId: userData?.userId,
    ...data,
  };

  const result = await prisma.adoptionRequest.create({
    data: adaptionData,
  });

  return result;
};

const getAllFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    },
  });

  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdoptionRequestWhereInput[] = [];

  // if (params.searchTerm) {
  //   andConditions.push({
  //     OR: petSearchAbleFields.map((field) => ({
  //       [field]: {
  //         contains: params.searchTerm,
  //         mode: "insensitive",
  //       },
  //     })),
  //   });
  // }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AdoptionRequestWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.adoptionRequest.findMany({
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

  const total = await prisma.adoptionRequest.count({
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

  // const result = await prisma.adoptionRequest.findMany();
  // return result;
};

const getMyAllFromDB = async (
  params: any,
  options: IPaginationOptions,
  userData: IUser
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    },
  });

  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.AdoptionRequestWhereInput[] = [];

  if (userData?.role) {
    andConditions.push({
      user: {
        id: userData.userId,
      },
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

  const whereConditions: Prisma.AdoptionRequestWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.adoptionRequest.findMany({
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

  const total = await prisma.adoptionRequest.count({
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
  requestId: string,
  data: Partial<AdoptionRequest>,
  userData: IUser
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      status: UserStatus.ACTIVE,
      isDeleted: false,
    },
  });

  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id: requestId,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id: requestId,
    },
    data,
  });

  return result;
};

const deleteIntoDB = async (
  userData: IUser,
  petId: string
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      isDeleted: false,
      status: UserStatus.ACTIVE,
    },
  });

  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id: petId,
    },
  });

  const result = await prisma.adoptionRequest.delete({
    where: {
      id: petId,
    },
  });

  return result;
};

export const adoptionRequestService = {
  createIntoDB,
  getAllFromDB,
  getMyAllFromDB,
  updateIntoDB,
  deleteIntoDB,
};
