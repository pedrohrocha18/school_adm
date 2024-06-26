import { Router } from "express";
import AlunoController from "./app/controllers/AlunoController.js";

const routes = Router();

routes.post("/alunos", AlunoController.addAluno);

export default routes;
