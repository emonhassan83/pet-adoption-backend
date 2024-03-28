"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const adoption_service_1 = require("./adoption.service");
const createAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error("This user is not authenticated");
    }
    const result = yield adoption_service_1.adoptionRequestService.createAdoptionRequestIntoDB(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Adoption request submitted successfully!",
        data: result,
    });
}));
const getAllAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        throw new Error("This user is not authenticated");
    }
    const result = yield adoption_service_1.adoptionRequestService.getAllAdoptionRequestFromDB(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Adoption requests retrieved successfully!",
        data: result,
    });
}));
const updateAAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestId } = req.params;
    if (!req.user) {
        throw new Error("This user is not authenticated");
    }
    const result = yield adoption_service_1.adoptionRequestService.updateAdoptionRequestIntoDB(requestId, req.body, req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Adoption request updated successfully!",
        data: result,
    });
}));
exports.adoptionRequestController = {
    createAdoptionRequest,
    getAllAdoptionRequest,
    updateAAdoptionRequest,
};
