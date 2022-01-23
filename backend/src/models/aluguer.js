const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Aluguer = sequelize.define("aluguer", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  valorTotal: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  motorista: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  combustivel: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  dataEntrega: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  dataPrevistaDevolucao: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  dataDevolucao: {
    type: Sequelize.DATE,
  },
  nota: {
    type: Sequelize.STRING,
  },
  multa: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Aluguer;
