import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully!",
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await userService.getAllFromDB(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getMyProfile = catchAsync(async (req, res) => {
  const result = await userService.getMyProfileFromDB(req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully!",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  const result = await userService.updateProfileIntoDB(req.user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllFromDB,
  getMyProfile,
  updateMyProfile,
};
