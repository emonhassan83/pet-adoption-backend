import { AdoptionRequest } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IAdoptionRequest, IUser } from "../../interfaces";

const createAdoptionRequestIntoDB = async (
  userData: IUser,
  data: IAdoptionRequest
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
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

const getAllAdoptionRequestFromDB = async (userData: IUser) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
    },
  });
  
  const result = await prisma.adoptionRequest.findMany();

  return result;
};

const updateAdoptionRequestIntoDB = async (
  requestId: string,
  data: Partial<AdoptionRequest>,
  userData: IUser
): Promise<AdoptionRequest> => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
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

export const adoptionRequestService = {
  createAdoptionRequestIntoDB,
  getAllAdoptionRequestFromDB,
  updateAdoptionRequestIntoDB
};
