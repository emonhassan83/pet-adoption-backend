import { z } from "zod";

const createPet = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    image: z.string({
      required_error: "Image is required!",
    }),
    species: z.string({
      required_error: "Species is required!",
    }),
    breed: z.string({
      required_error: "Breed is required!",
    }),
    age: z.number({
      required_error: "Age is required!",
    }),
    size: z.string({
      required_error: "Size is required!",
    }),
    location: z.string({
      required_error: "Location is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    temperament: z.string({
      required_error: "Temperament is required!",
    }),
    medicalHistory: z.string({
      required_error: "Medical History is required!",
    }),
    healthStatus: z.string({
      required_error: "Health status is required!",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption Requirements is required!",
    }),
  }),
});

const updatePet = z.object({
  body: z.object({
    name: z.string().optional(),
    image: z.string().optional(),
    species: z.string().optional(),
    breed: z.string().optional(),
    age: z.number().optional(),
    size: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    healthStatus: z.string().optional(),
    adoptionRequirements: z.string().optional(),
  }),
});

export const petValidation = {
  createPet,
  updatePet,
};
