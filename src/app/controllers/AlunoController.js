import Aluno from "../models/Aluno.js";
import Matricula from "../models/Matricula.js";

class AlunoController {
  async todosAlunos(req, res) {
    const alunos = await Aluno.findAll();
    const matriculas = await Matricula.findAll();

    let result = [];

    alunos.forEach((aluno) => {
      let matricul = matriculas.find(
        (matricula) => matricula.userId == aluno.id
      );

      if (matricul) {
        result.push({
          id: aluno.id,
          nome: aluno.nome,
          data_nasc: aluno.data_nasc,
          email: aluno.email,
          curso: matricul.curso,
          valor_mensal: matricul.valor_mensal,
          pag_atrasado: matricul.pag_atrasado,
        });
      }
    });

    res.status(200).json(result);
  }

  async alunoPorId(req, res) {
    const id = req.params.id;
    const aluno = await Aluno.findOne({
      where: { id: id },
    });

    res.status(200).json(aluno);
  }

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
