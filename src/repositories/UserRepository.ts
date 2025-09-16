import { MongoClient, ObjectId } from "mongodb";
import { IUser } from "../models/User";
import { uri } from "../config/db";

export class UserRepository {
  private client = new MongoClient(uri);
  private dbName = "test";

  async getAll(): Promise<IUser[]> {
    await this.client.connect();
    const users = await this.client.db(this.dbName).collection<IUser>("users").find().toArray();
    await this.client.close();
    return users;
  }

  async insert(user: IUser) {
    await this.client.connect();
    const result = await this.client.db(this.dbName).collection<IUser>("users").insertOne(user);
    await this.client.close();
    return result;
  }

  async update(user: IUser) {
    const id = new ObjectId(user._id);
    if (!id) throw new Error("ID obrigatório");

    const { _id, ...userData } = user;
    const filter = { _id: id };
    const updateDoc = { $set: userData };    

    await this.client.connect();    
    const result = await this.client.db(this.dbName).collection<IUser>("users").updateOne(filter, updateDoc);
    await this.client.close();

    console.log(result);

  return result;
}

  async delete(id: string) {
    const filter = { _id: new ObjectId(id) };
    await this.client.connect();
    const result = await this.client.db(this.dbName).collection<IUser>("users").deleteOne(filter);
    await this.client.close();
    return result;
  }
}
