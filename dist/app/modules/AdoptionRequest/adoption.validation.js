"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string({
            required_error: "PetId is required!",
        }),
        petOwnershipExperience: zod_1.z.string({
            required_error: "Pet Ownership Experience is required!",
        }),
    }),
});
const updateAdoptionRequest = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            client_1.RequestStatus.PENDING,
            client_1.RequestStatus.APPROVED,
            client_1.RequestStatus.REJECTED,
        ]),
    }),
});
exports.adoptionRequestSchema = {
    createAdoptionRequest,
    updateAdoptionRequest,
};
