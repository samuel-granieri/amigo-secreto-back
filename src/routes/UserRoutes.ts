import express from "express";
import { getUsers, insertUser, updateUser, deleteUser } from "../controllers/UserController";

const router = express.Router();

router.get("/getUsers", getUsers);
router.post("/insertUser", insertUser);
router.post("/updateUser", updateUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;
