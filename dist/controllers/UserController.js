"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.insertUser = exports.getUsers = void 0;
const UserService_1 = require("../services/UserService");
const service = new UserService_1.UserService();
const getUsers = async (req, res) => {
    const users = await service.getAllUsers();
    res.json(users);
};
exports.getUsers = getUsers;
const insertUser = async (req, res) => {
    const result = await service.createUser(req.body);
    res.json(result);
};
exports.insertUser = insertUser;
const updateUser = async (req, res) => {
    const result = await service.updateUser(req.body);
    res.json(result);
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const { id } = req.body;
    const result = await service.deleteUser(id);
    res.json(result);
};
exports.deleteUser = deleteUser;
