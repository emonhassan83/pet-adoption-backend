import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PetService } from "./pet.service";
import pick from "../../../shared/pick";
import { petSearchAbleFields } from "./pet.constant";
import { RequestWithUser } from "../../interfaces";

const createPet = catchAsync(async (req, res) => {
  const user = (req as RequestWithUser)?.user;
  const result = await PetService.createPetIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Pet added successfully!",
    data: result,
  });
});

const getAllPets = catchAsync(async (req, res) => {  
    const filters = pick(req.query, petSearchAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  
    const result = await PetService.getAllPetsFromDB(filters, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Pets retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

  const updateAPet = catchAsync(async (req, res) => {
    const { petId } = req.params;
    const user = (req as RequestWithUser)?.user;
    const result = await PetService.updateIntoDB(user, petId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Pet profile updated successfully!",
      data: result,
    });
  });

  const deleteAPet = catchAsync(async (req, res) => {
    const { petId } = req.params;
    const user = (req as RequestWithUser)?.user;
    const result = await PetService.deleteIntoDB(user, petId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Pet deleted successfully!",
      data: result,
    });
  });

export const petController = {
  createPet,
  getAllPets,
  updateAPet,
  deleteAPet
};
