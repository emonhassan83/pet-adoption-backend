import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adoptionRequestService } from "./adoption.service";
import { Request as ExpressRequest } from "express";
import { IUser } from "../../interfaces";

interface RequestWithUser extends ExpressRequest {
  user?: IUser | undefined;
}

const createAdoptionRequest = catchAsync(async (req: RequestWithUser, res) => {
  if (!req.user) {
    throw new Error("This user is not authenticated");
  }
  const result = await adoptionRequestService.createAdoptionRequestIntoDB(
    req.user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Adoption request submitted successfully!",
    data: result,
  });
});

const getAllAdoptionRequest = catchAsync(async (req: RequestWithUser, res) => {
  if (!req.user) {
    throw new Error("This user is not authenticated");
  }
  const result = await adoptionRequestService.getAllAdoptionRequestFromDB(
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption requests retrieved successfully!",
    data: result,
  });
});

const updateAAdoptionRequest = catchAsync(async (req: RequestWithUser, res) => {
  const { requestId } = req.params;

  if (!req.user) {
    throw new Error("This user is not authenticated");
  }
  const result = await adoptionRequestService.updateAdoptionRequestIntoDB(
    requestId,
    req.body,
    req.user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request updated successfully!",
    data: result,
  });
});

export const adoptionRequestController = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  updateAAdoptionRequest,
};
