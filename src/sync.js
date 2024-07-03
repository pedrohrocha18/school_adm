import sequileze from "../src/app/database/config.js";
import Aluno from "../src/app/models/Aluno.js";
import Matricula from "../src/app/models/Matricula.js";
import Notas from '../src/app/models/Notas.js'

sequileze
  .sync({ force: true })
  .then(() => {
    console.log("Tabelas criadas!");
  })
  .catch((err) => {
    console.log(err);
  });
