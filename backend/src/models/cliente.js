const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Cliente = sequelize.define("cliente", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      len: [3, 100],
    },
  },
  nuit: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  bi: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      len: [13, 13],
    },
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  telefone: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  endereco: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  tipo: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Cliente;
