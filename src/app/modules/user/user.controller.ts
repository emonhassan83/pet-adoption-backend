import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";

const createUser = catchAsync(async (req, res) => {

    const result = await userService.createUser(req);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "User registered successfully!",
        data: result
    })
});

export const userController = {
    createUser,
};