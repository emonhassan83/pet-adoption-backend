import { RequestStatus } from "@prisma/client";
import { z } from "zod";

const createAdoptionRequest = z.object({
  body: z.object({
    petId: z.string({
      required_error: "PetId is required!",
    }),
    petOwnershipExperience: z.string({
      required_error: "Pet Ownership Experience is required!",
    }),
  }),
});

const updateAdoptionRequest = z.object({
  body: z.object({
    status: z.enum([
      RequestStatus.PENDING,
      RequestStatus.APPROVED,
      RequestStatus.REJECTED,
    ]),
  }),
});

export const adoptionRequestSchema = {
  createAdoptionRequest,
  updateAdoptionRequest,
};
