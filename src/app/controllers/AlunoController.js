import { JSON } from "sequelize";
import Aluno from "../models/Aluno.js";
import Matricula from "../models/Matricula.js";

class AlunoController {
  async todosAlunos(req, res) {
    const alunos = await Aluno.findAll();
    const matriculas = await Matricula.findAll();

    let result = [];
    try {
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
    } catch (error) {
      res.status(404).json(error);
    }
  }

  async alunoPorId(req, res) {
    const id = req.params.id;

    try {
      const alunoSearch = await Aluno.findOne({ where: { id: id } });
      const matriculasSearch = await Matricula.findOne({
        where: { userId: id },
      });

      const result = {
        nome: alunoSearch.nome,
        data_nasc: alunoSearch.data_nasc,
        email: alunoSearch.email,
        curso: matriculasSearch.curso,
        valor_mensal: matriculasSearch.valor_mensal,
        pag_atrasado: matriculasSearch.pag_atrasado,
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: "dados não localizados!" });
    }
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
