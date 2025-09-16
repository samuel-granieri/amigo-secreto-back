// src/config/db.ts
import dotenv from "dotenv";
dotenv.config();

export const uri = process.env.MONGODB_URI || "";