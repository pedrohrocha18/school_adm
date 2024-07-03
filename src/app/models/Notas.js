import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";
import Matricula from "./Matricula.js";

const Notas = sequelize.define("Notas", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  
  portugues: {
    defaultValue: 0,
    type: DataTypes.FLOAT,
  },

  ingles: {
    defaultValue: 0,
    type: DataTypes.FLOAT,
  },

  matematica: {
    defaultValue: 0,
    type: DataTypes.FLOAT,
  },

  historia: {
    defaultValue: 0,
    type: DataTypes.FLOAT,
  },

  fisica: {
    defaultValue: 0,
    type: DataTypes.FLOAT,
  },

  quimica: {
    defaultValue: 0,
    type: DataTypes.FLOAT,
  },

  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: Matricula,
      key: "id",
    },
  },
});

Matricula.hasOne(Notas, {
  foreignKey: "userId",
});
Notas.belongsTo(Matricula, {
  foreignKey: "userId",
});

export default Notas;
