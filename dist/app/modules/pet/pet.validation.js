"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petValidation = void 0;
const zod_1 = require("zod");
const createPet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        image: zod_1.z.string({
            required_error: "Image is required!",
        }),
        species: zod_1.z.string({
            required_error: "Species is required!",
        }),
        breed: zod_1.z.string({
            required_error: "Breed is required!",
        }),
        age: zod_1.z.number({
            required_error: "Age is required!",
        }),
        size: zod_1.z.string({
            required_error: "Size is required!",
        }),
        location: zod_1.z.string({
            required_error: "Location is required!",
        }),
        description: zod_1.z.string({
            required_error: "Description is required!",
        }),
        temperament: zod_1.z.string({
            required_error: "Temperament is required!",
        }),
        medicalHistory: zod_1.z.string({
            required_error: "Medical History is required!",
        }),
        healthStatus: zod_1.z.string({
            required_error: "Health status is required!",
        }),
        adoptionRequirements: zod_1.z.string({
            required_error: "Adoption Requirements is required!",
        }),
    }),
});
const updatePet = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
        species: zod_1.z.string().optional(),
        breed: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        size: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        temperament: zod_1.z.string().optional(),
        medicalHistory: zod_1.z.string().optional(),
        healthStatus: zod_1.z.string().optional(),
        adoptionRequirements: zod_1.z.string().optional(),
    }),
});
exports.petValidation = {
    createPet,
    updatePet,
};
