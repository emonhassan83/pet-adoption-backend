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
exports.adoptionRequestService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAdoptionRequestIntoDB = (userData, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
        },
    });
    yield prisma_1.default.pet.findUniqueOrThrow({
        where: {
            id: data === null || data === void 0 ? void 0 : data.petId,
        },
    });
    const adaptionData = Object.assign({ userId: userData === null || userData === void 0 ? void 0 : userData.userId }, data);
    const result = yield prisma_1.default.adoptionRequest.create({
        data: adaptionData,
    });
    return result;
});
const getAllAdoptionRequestFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.findMany();
    return result;
});
const updateAdoptionRequestIntoDB = (requestId, data, userData) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: userData === null || userData === void 0 ? void 0 : userData.userId,
        },
    });
    yield prisma_1.default.adoptionRequest.findUniqueOrThrow({
        where: {
            id: requestId,
        },
    });
    const result = yield prisma_1.default.adoptionRequest.update({
        where: {
            id: requestId,
        },
        data,
    });
    return result;
});
exports.adoptionRequestService = {
    createAdoptionRequestIntoDB,
    getAllAdoptionRequestFromDB,
    updateAdoptionRequestIntoDB
};
