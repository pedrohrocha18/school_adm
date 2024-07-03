import Aluno from "../models/Aluno.js";
import Matricula from "../models/Matricula.js";

class MatriculaController {
  async todasMatriculas(req, res) {
    try {
      const result = [];
      const alunos = await Aluno.findAll();
      const matriculas = await Matricula.findAll();

      alunos.forEach((aluno) => {
        const matricul = matriculas.find(
          (matricula) => matricula.userId == aluno.id
        );

        if (matricul) {
          result.push({
            id_aluno: aluno.id,
            nome: aluno.nome,
            data_nasc: aluno.data_nasc,
            email: aluno.email,
            id_matricula: matricul.id,
            curso: matricul.curso,
            data_matricula: matricul.data_matricula,
            valor_mensal: matricul.valor_mensal,
            curso_concluido: matricul.curso_concluido,
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

  async atualizarMatricula(req, res) {
    const id = req.params.id;
    const updateInformation = req.body;

    try {
      const aluno = await Aluno.findOne({
        where: { id: id },
      });

      if (aluno) {
        await Matricula.update(
          {
            curso: updateInformation.curso,
            valor_mensal: updateInformation.valor_mensal,
            curso_concluido: updateInformation.curso_concluido,
          },
          { where: { userId: aluno.id } }
        );
        res.status(200).json({ success: "Dados atualizados!" });
      } else {
        res.status(404).json({ error: "Dados não localizados!" });
      }
    } catch (error) {
      res.status(404).json(error);
    }
  }
}

export default new MatriculaController();
