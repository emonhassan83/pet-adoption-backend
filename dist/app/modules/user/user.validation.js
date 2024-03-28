"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }),
        email: zod_1.z.string({
            required_error: "Email is required!",
        }),
        password: zod_1.z.string({
            required_error: "Password is required",
        }),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!",
        }).optional(),
        email: zod_1.z.string({
            required_error: "Email is required!",
        }).optional(),
    }),
});
exports.userValidation = {
    createUser,
    updateUser
};
