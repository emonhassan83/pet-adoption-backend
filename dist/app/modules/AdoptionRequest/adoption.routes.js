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
const router = express_1.default.Router();
router.post('/adoption-request', (0, auth_1.default)(), (0, validateRequest_1.default)(adoption_validation_1.adoptionRequestSchema.createAdoptionRequest), adoption_controller_1.adoptionRequestController.createAdoptionRequest);
router.get('/adoption-requests', (0, auth_1.default)(), adoption_controller_1.adoptionRequestController.getAllAdoptionRequest);
router.put('/adoption-requests/:requestId', (0, auth_1.default)(), (0, validateRequest_1.default)(adoption_validation_1.adoptionRequestSchema.updateAdoptionRequest), adoption_controller_1.adoptionRequestController.updateAAdoptionRequest);
exports.adoptionRequestRoutes = router;
