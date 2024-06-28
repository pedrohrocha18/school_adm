import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";
import Matricula from "./Matricula.js";

const NotasFrequencia = sequelize.define("Matricula", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  qntd_faltas: {
    qntd_faltas: 0,
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  portugues: {
    portugues: 0,
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  ingles: {
    ingles: 0,
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  matematica: {
    matematica: 0,
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  historia: {
    historia: 0,
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  fisica: {
    fisica: 0,
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  quimica: {
    quimica: 0,
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Matricula,
      key: "id",
    },
  },
});

Matricula.hasOne(NotasFrequencia, {
  foreignKey: "userId",
});
NotasFrequencia.belongsTo(Matricula, {
  foreignKey: "userId",
});

export default NotasFrequencia;
