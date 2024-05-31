import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { RequestWithUser } from "../../interfaces";

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
  const user = (req as RequestWithUser)?.user;
  const result = await userService.getMyProfileFromDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully!",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req, res) => {
  // console.log(req.body);
  
  const user = (req as RequestWithUser)?.user;
  const result = await userService.updateProfileIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile updated successfully!",
    data: result,
  });
});

const changeUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.changeUserRole(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users role changed successfully!",
    data: result,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userService.changeUserStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users profile status changed!",
    data: result,
  });
});

export const userController = {
  createUser,
  getAllFromDB,
  getMyProfile,
  updateMyProfile,
  changeUserRole,
  changeProfileStatus,
};
