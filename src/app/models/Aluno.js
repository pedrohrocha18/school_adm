import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

const Aluno = sequelize.define("Aluno", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },

  data_nasc: {
    type: DataTypes.DATE,
    allowNull: false,
    required: true,
  },
  
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
});

export default Aluno;
