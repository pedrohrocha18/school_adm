import Aluno from "../models/Aluno.js";
import Matricula from "../models/Matricula.js";

const cursos = [
  {
    id: 1,
    curso: "Engenharia Civil",
    mensalidade: 1500.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 2,
    curso: "Direito",
    mensalidade: 1800.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 3,
    curso: "Administração",
    mensalidade: 1200.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 4,
    curso: "Ciência da Computação",
    mensalidade: 2000.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 5,
    curso: "Medicina",
    mensalidade: 3500.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 6,
    curso: "Psicologia",
    mensalidade: 1600.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 7,
    curso: "Economia",
    mensalidade: 1400.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 8,
    curso: "Enfermagem",
    mensalidade: 1800.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 9,
    curso: "Arquitetura",
    mensalidade: 1900.0,
    vencimento_mensalidade: "2024-07-10",
  },
  {
    id: 10,
    curso: "Odontologia",
    mensalidade: 2500.0,
    vencimento_mensalidade: "2024-07-10",
  },
];

class AlunoController {
  async todosAlunos() {}

  async alunoPorId() {}

  async addAluno(req, res) {
    const aluno = await Aluno.create(req.body);

    const matricula = await Matricula.create({
      curso: req.body.curso,
      valor_mensal: req.body.valor_mensal,
      pag_atrasado: req.body.pag_atrasado,
      userId: aluno.id,
    });

    res.status(201).json(aluno);
  }

  async deleteAluno() {}

  async updateAluno() {}
}

export default new AlunoController();
