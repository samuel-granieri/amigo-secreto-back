import { ObjectId } from "mongodb";

export interface IUser {
  _id?: ObjectId;
  nome: string;
  sapato: string;
  blusa: string;
  calca: string;
  observacoes: string;
}