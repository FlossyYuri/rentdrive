const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const status = require("http-status");
const { compareHash, generateToken, verifyToken, genToken, updateRow } = require("../utils");
const { Op } = require("sequelize");
const mailer = require("../config/mailer");

exports.Login = (req, res, next) => {
  const { email, senha } = req.body;

  Usuario.findOne({ where: { email } })
    .then(async (usuario) => {
      if (usuario) {
        const validPassword = await compareHash(senha, usuario.senha);
        if (validPassword) {
          if (usuario.ativo) {

            const token = generateToken(usuario.id);
            res.status(status.OK).send({ token });
          } else {
            res.status(status.UNAUTHORIZED).send("Usuário desativado, contacte o administrador!");
          }
        } else {
          res.status(status.UNAUTHORIZED).send("Senha incorreta!");
        }
      } else {
        res.status(status.NOT_FOUND).send("Nenhum usuário com esse email!");
      }
    })
    .catch((error) => next(error));
};
exports.ME = async (req, res, next) => {
  res.status(status.OK).send({});
};
exports.Email = async (req, res) => {
  const { email } = req.body
  if (email) {
    try {
      const { dataValues: usuario } = await Usuario.findOne({
        where: { email }, attributes: {
          exclude: ['senha', 'contacto']
        }
      })
      const resetUrl = `${process.env.APP_URL}/recuperar?token=${genToken({ usuario }, 20 * 60)}`
      await mailer({
        to: email,
        subject: `Recupere sua senha!`,
        template: 'recuperaSenha',
        context: {
          name: usuario.nome,
          email:
            usuario.email,
          resetUrl
        },
      })
      res.send("Sent")
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    res.status(400).send()
  }
};
exports.Email2 = async (req, res) => {
  const { email } = req.body
  if (email) {
    try {
      await mailer({
        to: 'emerson.yur@gmail.com',
        subject: `Recupere sua senha!`,
        template: 'second',
      })
      res.send("Sent")
    } catch (error) {
      res.status(400).send(error)
    }
  } else {
    res.status(400).send()
  }
};
exports.NovaSenha = async (req, res) => {
  const { token, password, passwordConfirmation } = req.body
  jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
    if (err)
      res.status(status.UNAUTHORIZED).send(err)
    else {
      if (password === passwordConfirmation) {
        updateRow(req, res, Usuario, { senha: password }, data.usuario.id)
          .then((data) => {
            if (typeof data === 'string') res.status(status.NOT_FOUND).send();
            else res.status(status.OK).send();
          }).catch((err => defaultErrorHandler(res, err)))
      } else {
        res.status(status.BAD_REQUEST).send({ message: 'Senhas diferentes.' });
      }
    }
  });
};
exports.Refresh = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const decoded = jwt.decode(token);
  if (decoded) {
    verifyToken(decoded.refreshToken, (err, user) => {
      if (err) {
        res.status(status.NOT_FOUND).send(err);
      } else {
        const newToken = generateToken(decoded.id);
        res.status(status.OK).send({ token: newToken });
      }
    });
  }
  res.status(status.NOT_FOUND).send();
};
