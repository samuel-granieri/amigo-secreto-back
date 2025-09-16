"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.get("/getUsers", UserController_1.getUsers);
router.post("/insertUser", UserController_1.insertUser);
router.post("/updateUser", UserController_1.updateUser);
router.post("/deleteUser", UserController_1.deleteUser);
exports.default = router;
