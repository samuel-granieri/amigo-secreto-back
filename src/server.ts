import express from "express";
import cors from "cors";
import userRoutes from "./routes/UserRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3443;

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
