"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const pet_validation_1 = require("./pet.validation");
const pet_controller_1 = require("./pet.controller");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(pet_validation_1.petValidation.createPet), pet_controller_1.petController.createPet);
router.get("/", pet_controller_1.petController.getAllPets);
router.get("/my-pets", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), pet_controller_1.petController.getMyPets);
router.get("/:petId", 
// auth(UserRole.ADMIN, UserRole.USER),
pet_controller_1.petController.getAPet);
router.put("/:petId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), (0, validateRequest_1.default)(pet_validation_1.petValidation.updatePet), pet_controller_1.petController.updateAPet);
router.delete("/:petId", (0, auth_1.default)(client_1.UserRole.SUPER_ADMIN, client_1.UserRole.ADMIN), pet_controller_1.petController.deleteAPet);
exports.petRoutes = router;
