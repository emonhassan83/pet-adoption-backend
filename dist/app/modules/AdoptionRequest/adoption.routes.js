"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const adoption_controller_1 = require("./adoption.controller");
const adoption_validation_1 = require("./adoption.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(adoption_validation_1.adoptionRequestSchema.createAdoptionRequest), adoption_controller_1.adoptionRequestController.createAdoptionRequest);
router.get("/", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), adoption_controller_1.adoptionRequestController.getAllAdoptionRequest);
router.get("/my-adoption", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), adoption_controller_1.adoptionRequestController.getMyAdoptionRequest);
router.put("/:requestId", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), (0, validateRequest_1.default)(adoption_validation_1.adoptionRequestSchema.updateAdoptionRequest), adoption_controller_1.adoptionRequestController.updateAAdoptionRequest);
router.delete("/:requestId", (0, auth_1.default)(client_1.UserRole.ADMIN, client_1.UserRole.USER), adoption_controller_1.adoptionRequestController.deleteAAdoptionRequest);
exports.adoptionRequestRoutes = router;
