const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Funcionario = sequelize.define("funcionario", {
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
  bi: {
    allowNull: false,
    type: Sequelize.STRING,
    validate: {
      len: [13, 13],
    },
  },
  dataNascimento: {
    allowNull: true,
    type: Sequelize.DATE,
  },
  sexo: {
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
  funcao: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  salario: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  nomeBanco: {
    allowNull: false,
    type: Sequelize.STRING,
  },
  numeroConta: {
    allowNull: false,
    type: Sequelize.INTEGER,
  },
  nib: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Funcionario;
