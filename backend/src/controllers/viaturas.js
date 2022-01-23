const Viatura = require("../models/viatura");
const status = require("http-status");
const { fetchPaginatedData, updateRow, cloneObject, defaultErrorHandler } = require("../utils");
const { Op } = require("sequelize");

exports.Insert = (req, res) => {
  const data = req.body;
  Viatura.create(data)
    .then((viatura) => {
      if (viatura) {
        res.status(status.OK).send(viatura);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
exports.SearchAll = (req, res) => {
  const { viatura, precoDia } = req.query;

  const where = {};
  if (viatura) {
    const items = viatura.split(' ').filter(element => {
      return element !== '';
    }).map((text) => ({ [Op.substring]: text }));
    where[Op.or] = [
      { marca: { [Op.or]: items } },
      { modelo: { [Op.or]: items } }
    ]
  }
  if (precoDia) {
    where.precoDia = {
      [Op.gte]: precoDia
    }
  }
  fetchPaginatedData(req, res, Viatura, where)
};
exports.SearchOne = (req, res) => {
  const id = req.params.id;
  Viatura.findByPk(id)
    .then((viatura) => {
      if (viatura) {
        res.status(status.OK).send(viatura);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Update = (req, res) => {
  const { precoDia, disponivel } = req.body
  updateRow(req, res, Viatura, cloneObject({ precoDia, disponivel }))
    .then((data) => {
      if (typeof data === 'string') res.status(status.NOT_FOUND).send();
      else res.status(status.OK).send(data);
    }).catch((err => defaultErrorHandler(res, err)))
};

exports.UpdateRow = (id, body) => {
  const { precoDia, disponivel } = body
  return Viatura.update(cloneObject({ precoDia, disponivel }), { where: { id } })
};

exports.Delete = (req, res) => {
  const { id } = req.params;
  Viatura.findByPk(id)
    .then((viatura) => {
      if (viatura) {
        viatura
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
