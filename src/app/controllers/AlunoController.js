import Aluno from "../models/Aluno.js";
import Matricula from "../models/Matricula.js";

class AlunoController {
  async todosAlunos(req, res) {
    try {
      let result = [];
      const alunos = await Aluno.findAll();
      const matriculas = await Matricula.findAll();

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

      const result = {
        id: alunoSearch.id,
        nome: alunoSearch.nome,
        data_nasc: alunoSearch.data_nasc,
        email: alunoSearch.email,
        matricula_id: matriculasSearch.id,
        curso: matriculasSearch.curso,
        valor_mensal: matriculasSearch.valor_mensal,
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

      const alunoAdicionado = {
        id: aluno.id,
        nome: aluno.nome,
        data_nasc: aluno.data_nasc,
        email: aluno.email,
        matricula_id: matricula.id,
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

  async deleteAluno(req, res) {}

  // async updateAluno(req, res) {
  //   try {
  //     const idParams = req.params.id;
  //     const alunoUpdate = req.body;

  //     const aluno = await Aluno.update(
  //       {
  //         nome: alunoUpdate.nome,
  //         data_nasc: alunoUpdate.data_nasc,
  //         email: alunoUpdate.email,
  //       },
  //       { where: { id: idParams } }
  //     );

  //     const alunoSearch = await Aluno.findOne({ where: { id: idParams } });

  //     if (alunoSearch == null) {
  //       res.status(404).json({ error: "Dados não localizados!" });
  //     } else {
  //       res.status(200).json({ "Aluno atualizado": alunoSearch });
  //     }
  //   } catch (error) {
  //     res.status(404).json({ error: "Dados não localizados!" });
  //   }
  // }
}

export default new AlunoController();
