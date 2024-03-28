import { AdoptionRequest } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IUser } from "../../interfaces";

const createAdoptionRequestIntoDB = async (userData: IUser, data: any): Promise<AdoptionRequest> => {
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
        ...data
      }
      
    const result = await prisma.adoptionRequest.create({
      data: adaptionData,
    });
  
    return result;
  };

  export const adoptionRequestService = {
    createAdoptionRequestIntoDB
  };
  