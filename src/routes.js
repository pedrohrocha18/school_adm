import { Router } from "express";
import AlunoController from "./app/controllers/AlunoController.js";

const routes = Router();

routes.get("/alunos", AlunoController.todosAlunos);
routes.get("/alunos/:id", AlunoController.alunoPorId);
routes.post("/alunos", AlunoController.addAluno);

export default routes;
