"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
class UserService {
    constructor() {
        this.repo = new UserRepository_1.UserRepository();
    }
    async getAllUsers() {
        return this.repo.getAll();
    }
    async createUser(user) {
        return this.repo.insert(user);
    }
    async updateUser(user) {
        return this.repo.update(user);
    }
    async deleteUser(id) {
        return this.repo.delete(id);
    }
}
exports.UserService = UserService;
