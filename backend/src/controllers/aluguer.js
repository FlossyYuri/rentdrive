const Aluguer = require("../models/aluguer");
const status = require("http-status");
const { fetchPaginatedData, updateRow, cloneObject, defaultErrorHandler } = require("../utils");
const { Op } = require("sequelize");
const Cliente = require("../models/cliente");
const Viatura = require("../models/viatura");
const Viaturas = require("./viaturas");

exports.Insert = (req, res) => {
  const data = req.body;
  Aluguer.create(data)
    .then((aluguer) => {
      if (aluguer) {
        Viaturas.UpdateRow(data.viaturaId, { disponivel: 0 })
        res.status(status.OK).send(aluguer);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
exports.SearchAll = (req, res) => {
  const { cliente, viatura, data } = req.query;

  const where = {}
  const clienteWhere = {}
  const viaturaWhere = {}
  if (data) {
    where.dataEntrega = { [Op.gte]: new Date(data) }
  }
  if (cliente) {
    clienteWhere.nome = {
      [Op.substring]: cliente
    }
  }
  if (viatura) {
    const items = viatura.split(' ').filter(element => {
      return element !== '';
    }).map((text) => ({ [Op.substring]: text }));
    viaturaWhere[Op.or] = [
      { marca: { [Op.or]: items } },
      { modelo: { [Op.or]: items } }
    ]
  }
  const include = [
    {
      model: Cliente,
      where: clienteWhere
    },
    {
      model: Viatura,
      where: viaturaWhere
    },
  ]
  fetchPaginatedData(req, res, Aluguer, where, undefined, include)
};
exports.SearchOne = (req, res) => {
  const id = req.params.id;
  Aluguer.findByPk(id)
    .then((aluguer) => {
      if (aluguer) {
        res.status(status.OK).send(aluguer);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Update = (req, res) => {
  const { dataDevolucao, multa, nota } = req.body
  updateRow(req, res, Aluguer, cloneObject({ dataDevolucao, multa, nota }))
    .then((data) => {
      Viaturas.UpdateRow(data.viaturaId, { disponivel: 1 })
      if (typeof data === 'string') res.status(status.NOT_FOUND).send();
      else res.status(status.OK).send(data);
    }).catch((err => defaultErrorHandler(res, err)))
};

exports.Delete = (req, res) => {
  const { id } = req.params;
  Aluguer.findByPk(id)
    .then((aluguer) => {
      if (aluguer) {
        aluguer
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
