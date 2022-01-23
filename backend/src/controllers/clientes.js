const Cliente = require("../models/cliente");
const status = require("http-status");
const { fetchPaginatedData, updateRow, cloneObject, defaultErrorHandler } = require("../utils");
const { Op } = require("sequelize");

exports.Insert = (req, res) => {
  const data = req.body;
  Cliente.create(data)
    .then((cliente) => {
      if (cliente) {
        res.status(status.OK).send(cliente);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
exports.SearchAll = (req, res) => {
  const { nome, bi } = req.query;

  const where = {}
  if (nome) {
    where.nome = {
      [Op.substring]: nome
    }
  }
  if (bi) {
    where.bi = {
      [Op.substring]: bi
    }
  }
  fetchPaginatedData(req, res, Cliente, where)
};
exports.SearchOne = (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id)
    .then((cliente) => {
      if (cliente) {
        res.status(status.OK).send(cliente);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Update = (req, res) => {
  const { telefone, endereco } = req.body
  updateRow(req, res, Cliente, cloneObject({ telefone, endereco }))
    .then((data) => {
      if (typeof data === 'string') res.status(status.NOT_FOUND).send();
      else res.status(status.OK).send(data);
    }).catch((err => defaultErrorHandler(res, err)))
};

exports.Delete = (req, res) => {
  const { id } = req.params;
  Cliente.findByPk(id)
    .then((cliente) => {
      if (cliente) {
        cliente
          .destroy({
            where: { id },
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch((error) => next(error));
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
