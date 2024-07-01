import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";
import Aluno from "./Aluno.js";

const Matricula = sequelize.define("Matricula", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  data_matricula: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  curso: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  curso_concluido: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  valor_mensal: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Aluno,
      key: "id",
    },
  },
});

Aluno.hasOne(Matricula, {
  foreignKey: "userId",
});
Matricula.belongsTo(Aluno, {
  foreignKey: "userId",
});

export default Matricula;
