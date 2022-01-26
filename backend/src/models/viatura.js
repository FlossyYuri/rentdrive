const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Viatura = sequelize.define("viatura", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  imagem: {
    type: Sequelize.STRING,
  },
  marca: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  modelo: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  matricula: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  ano: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  precoDia: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  cambio: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  disponivel: {
    allowNull: false,
    type: Sequelize.BOOLEAN,
  },
  validadeSeguro: {
    allowNull: false,
    type: Sequelize.DATE,
  },
  validadeInspencao: {
    allowNull: false,
    type: Sequelize.DATE,
  },
});

module.exports = Viatura;
