import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const service = new UserService();

export const getUsers = async (req: Request, res: Response) => {
  const users = await service.getAllUsers();
  res.json(users);
};

export const insertUser = async (req: Request, res: Response) => {
  const result = await service.createUser(req.body);
  res.json(result);
};

export const updateUser = async (req: Request, res: Response) => {
  const result = await service.updateUser(req.body);
  res.json(result);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.query;
  const result = await service.deleteUser(id as string);
  res.json(result);
};
