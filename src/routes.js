import { Router } from "express";
import AlunoController from "./app/controllers/AlunoController.js";
import MatriculaController from "./app/controllers/MatriculaController.js";

const routes = Router();

// Alunos
routes.post("/alunos", AlunoController.addAluno);
routes.get("/alunos", AlunoController.todosAlunos);
routes.get("/alunos/:id", AlunoController.alunoPorId);
routes.delete("/alunos/:id", AlunoController.deleteAluno);

// Matrículas
routes.get("/matriculas", MatriculaController.todasMatriculas);
routes.put("/matriculas/:id", MatriculaController.atualizarMatricula);

export default routes;
