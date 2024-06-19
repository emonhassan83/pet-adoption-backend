import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { RequestWithUser } from "../../interfaces";

const createBlog = catchAsync(async (req, res) => {
  const user = (req as RequestWithUser)?.user;
  const result = await PetService.createPetIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Blog added successfully!",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {  
    const filters = pick(req.query, petFilterableFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  
    const result = await PetService.getAllPetsFromDB(filters, options);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blogs retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

const getMyBlogs = catchAsync(async (req, res) => {  
    const filters = pick(req.query, petSearchAbleFields);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
    const user = (req as RequestWithUser)?.user;
  
    const result = await PetService.getMyPetsFromDB(filters, options, user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "My all blogs retrieved successfully!",
      meta: result.meta,
      data: result.data,
    });
  });

const getABlog = catchAsync(async (req, res) => {
  const { petId } = req.params;
    const user = (req as RequestWithUser)?.user;
  
    const result = await PetService.getAIntoDB(petId, user);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "A blog retrieved successfully!",
      data: result,
    });
  });

  const updateABlog = catchAsync(async (req, res) => {
    const { petId } = req.params;
    const user = (req as RequestWithUser)?.user;
    const result = await PetService.updateIntoDB(user, petId, req.body);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog profile updated successfully!",
      data: result,
    });
  });

  const deleteABlog = catchAsync(async (req, res) => {
    const { petId } = req.params;
    const user = (req as RequestWithUser)?.user;
    const result = await PetService.deleteIntoDB(user, petId);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Blog deleted successfully!",
      data: result,
    });
  });

export const blogController = {
  createBlog,
  getAllBlogs,
  getMyBlogs,
  getABlog,
  updateABlog,
  deleteABlog
};
