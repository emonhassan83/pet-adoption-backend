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
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.petValidation.createPet), pet_controller_1.petController.createPet);
router.get("/", (0, auth_1.default)(), pet_controller_1.petController.getAllPets);
router.put("/:petId", (0, auth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.petValidation.updatePet), pet_controller_1.petController.updateAPet);
exports.petRoutes = router;
