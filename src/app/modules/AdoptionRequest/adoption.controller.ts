import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { adoptionRequestService } from "./adoption.service";

const createAdoptionRequest = catchAsync(async (req, res) => {
    const result = await adoptionRequestService.createAdoptionRequestIntoDB(req.user, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Adoption request submitted successfully!",
      data: result,
    });
  });

  export const adoptionRequestController = {
    createAdoptionRequest,
  };
  