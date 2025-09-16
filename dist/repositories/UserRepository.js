"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
class UserRepository {
    constructor() {
        this.client = new mongodb_1.MongoClient(db_1.uri);
        this.dbName = "test";
    }
    async getAll() {
        await this.client.connect();
        const users = await this.client.db(this.dbName).collection("users").find().toArray();
        await this.client.close();
        return users;
    }
    async insert(user) {
        await this.client.connect();
        const result = await this.client.db(this.dbName).collection("users").insertOne(user);
        await this.client.close();
        return result;
    }
    async update(user) {
        if (!user._id)
            throw new Error("ID obrigatório");
        const filter = { _id: new mongodb_1.ObjectId(user._id) };
        const updateDoc = { $set: { ...user } };
        await this.client.connect();
        const result = await this.client.db(this.dbName).collection("users").updateOne(filter, updateDoc);
        await this.client.close();
        return result;
    }
    async delete(id) {
        const filter = { _id: new mongodb_1.ObjectId(id) };
        await this.client.connect();
        const result = await this.client.db(this.dbName).collection("users").deleteOne(filter);
        await this.client.close();
        return result;
    }
}
exports.UserRepository = UserRepository;
