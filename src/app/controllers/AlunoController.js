import Aluno from "../models/Aluno.js";
import Matricula from "../models/Matricula.js";
import Notas from "../models/Notas.js";

class AlunoController {
  async todosAlunos(req, res) {
    try {
      const result = [];
      const alunos = await Aluno.findAll();
      const matriculas = await Matricula.findAll();

      alunos.forEach((aluno) => {
        const findMatric = matriculas.find(
          (matricula) => matricula.userId == aluno.id
        );

        if (findMatric) {
          result.push({
            aluno_id: aluno.id,
            nome: aluno.nome,
            data_nasc: aluno.data_nasc,
            curso: findMatric.curso,
          });
        }
      });
      if (result.length == 0) {
        res.status(404).json({ error: "Dados não localizados!" });
      } else {
        res.status(200).json(result);
      }
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

      const notasSearch = await Notas.findAll({
        where: { userId: id },
      });

      const notas = {
        Português: notasSearch[0].dataValues.portugues,
        Inglês: notasSearch[0].dataValues.ingles,
        Matemática: notasSearch[0].dataValues.matematica,
        História: notasSearch[0].dataValues.historia,
        Física: notasSearch[0].dataValues.fisica,
        Química: notasSearch[0].dataValues.quimica,
      };

      const result = {
        aluno_id: alunoSearch.id,
        nome: alunoSearch.nome,
        data_nasc: alunoSearch.data_nasc,
        email: alunoSearch.email,
        curso: matriculasSearch.curso,
        valor_mensal: matriculasSearch.valor_mensal,
        curso_concluido: matriculasSearch.curso_concluido,
        notas,
      };

      res.status(200).json(result);
    } catch (error) {
      res.status(404).json({ error: "dados não localizados!" });
    }
  }

  async addAluno(req, res) {
    try {
      const aluno = await Aluno.create(req.body);

      const matricula = await Matricula.create({
        curso: req.body.curso,
        valor_mensal: req.body.valor_mensal,
        pag_atrasado: req.body.pag_atrasado,
        userId: aluno.id,
      });

      await Notas.create({
        userId: matricula.userId,
      });

      const alunoAdicionado = {
        nome: aluno.nome,
        data_nasc: aluno.data_nasc,
        email: aluno.email,
        curso: matricula.curso,
        valor_mensal: matricula.valor_mensal,
      };
      res.status(201).json(alunoAdicionado);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        error: `Não foi possível adicionar o aluno! Está faltando alguma informação.`,
      });
    }
  }

  async deleteAluno(req, res) {
    const id = req.params.id;

    const alunoSearch = await Aluno.findOne({ where: { id: id } });

    try {
      if (alunoSearch) {
        await Aluno.destroy({ where: { id: alunoSearch.id } });
        await Matricula.destroy({
          where: { userId: alunoSearch.id },
        });
        await Notas.destroy({
          where: { userId: alunoSearch.id },
        });

        res.status(200).json({ sucess: "Aluno deletado!" });
      } else {
        res.status(404).json({ error: "Dados não localizados!" });
      }
    } catch (error) {
      res.status(404).json({ error: "Dados não localizados!" });
    }
  }
}

export default new AlunoController();
