import { Sequelize } from "sequelize";

const sequelize = new Sequelize("bd_school", "root", "1807.Drika", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
