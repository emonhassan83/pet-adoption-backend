import { UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const createUser = z.object({
    body: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      email: z.string({
        required_error: "Email is required!",
      }),
      password: z.string({
        required_error: "Password is required",
      }),
    }),
  });

const updateUser = z.object({
    body: z.object({
      name: z.string({
        required_error: "Name is required!",
      }).optional(),
      email: z.string({
        required_error: "Email is required!",
      }).optional(),
    }),
  });

  const updateStatus = z.object({
    body: z.object({
        status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED])
    })
  })

  const updateRole = z.object({
    body: z.object({
        status: z.enum([UserRole.ADMIN, UserRole.USER])
    })
  })

  export const userValidation = {
    createUser,
    updateUser,
    updateStatus,
    updateRole
  };