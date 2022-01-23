const Sequelize = require("sequelize");
const sequelize = require("../database/database");
const { generateHash } = require("../utils");

const Usuario = sequelize.define("usuario", {
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
  senha: {
    allowNull: false,
    type: Sequelize.STRING,
    set(value) {
      this.setDataValue('senha', generateHash(value));
    },
  },
  tipo: {
    allowNull: false,
    type: Sequelize.STRING,
  },
});

module.exports = Usuario;
