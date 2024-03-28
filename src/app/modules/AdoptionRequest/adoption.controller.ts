import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adoptionRequestService } from "./adoption.service";
import { RequestWithUser } from "../../interfaces";

const createAdoptionRequest = catchAsync(async (req, res) => {
  const user = (req as RequestWithUser)?.user;
  const result = await adoptionRequestService.createAdoptionRequestIntoDB(
    user,
    req.body
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Adoption request submitted successfully!",
    data: result,
  });
});

const getAllAdoptionRequest = catchAsync(async (req, res) => {
  const user = (req as RequestWithUser)?.user;
  const result = await adoptionRequestService.getAllAdoptionRequestFromDB(
    user
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption requests retrieved successfully!",
    data: result,
  });
});

const updateAAdoptionRequest = catchAsync(async (req, res) => {
  const { requestId } = req.params;

  const user = (req as RequestWithUser)?.user;
  const result = await adoptionRequestService.updateAdoptionRequestIntoDB(
    requestId,
    req.body,
    user
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
