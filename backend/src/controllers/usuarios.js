const Usuario = require("../models/usuario");
const Funcionario = require("../models/funcionario");
const status = require("http-status");
const { fetchPaginatedData, defaultErrorHandler, cloneObject } = require("../utils");
const { Op } = require("sequelize");

exports.Insert = (req, res) => {
  const usuario = req.body;
  Usuario.create(usuario)
    .then((usuario) => {
      if (usuario) {
        res.status(status.OK).send(usuario);
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.SearchAll = (req, res) => {
  const { nome } = req.query;

  const where = {}
  if (nome) {
    where.nome = {
      [Op.substring]: nome
    }
  }
  const include = { model: Funcionario };
  fetchPaginatedData(req, res, Usuario, where, undefined, include)
};
exports.SearchOne = (req, res) => {
  const id = req.params.id;

  Usuario.findByPk(id)
    .then(async (usuario) => {
      if (usuario) {
        const empresas = await Empresa.count({
          where: { usuarioId: usuario.id },
        })
        const receita = await Movimento.sum('valor', {
          where: {
            tipo: { [Op.or]: ['pagamento', 'cadastrar-empresa'] },
            usuarioId: usuario.id
          },
        })
        res.status(status.OK).send({ ...usuario.dataValues, empresas, receita });
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Update = (req, res) => {
  const id = req.params.id;
  const { senha } = req.body

  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        usuario
          .update(cloneObject({ senha }), {
            where: { id },
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch((error) => defaultErrorHandler(res, error));
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};

exports.Delete = (req, res) => {
  const { id } = req.params;
  Usuario.findByPk(id)
    .then((usuario) => {
      if (usuario) {
        usuario
          .destroy({
            where: { id },
          })
          .then(() => {
            res.status(status.OK).send();
          })
          .catch((error) => defaultErrorHandler(res, error));
      } else {
        res.status(status.NOT_FOUND).send();
      }
    })
    .catch((error) => defaultErrorHandler(res, error));
};
