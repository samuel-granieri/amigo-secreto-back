import { UserRepository } from "../repositories/UserRepository";
import { IUser } from "../models/User";

export class UserService {
  private repo = new UserRepository();

  async getAllUsers(): Promise<IUser[]> {
    return this.repo.getAll();
  }

  async createUser(user: IUser) {
    return this.repo.insert(user);
  }

  async updateUser(user: IUser) {
    return this.repo.update(user);
  }

  async deleteUser(id: string) {
    return this.repo.delete(id);
  }
}
