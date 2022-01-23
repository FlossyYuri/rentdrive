const status = require("http-status");
const { defaultErrorHandler } = require("../utils");
const Aluguer = require("../models/aluguer");
const Cliente = require("../models/cliente");
const Viatura = require("../models/viatura");

exports.SearchAll = async (req, res) => {
  const { tipo } = req.query;
  if (tipo) {
    where.tipo = tipo
  }

  try {
    const aluguers = await Aluguer.count()
    const clientes = await Cliente.count()
    const viaturas = await Viatura.count()
    const receita = await Aluguer.sum('valorTotal') + await Aluguer.sum('multa')
    res.status(status.OK).send({ aluguers, clientes, viaturas, receita })
  } catch (error) {
    defaultErrorHandler(res, error)
  }

};