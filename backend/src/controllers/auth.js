const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const status = require("http-status");
const { compareHash, generateToken, verifyToken, genToken, updateRow } = require("../utils");

exports.Login = (req, res, next) => {
  const { nome, senha } = req.body;

  Usuario.findOne({ where: { nome } })
    .then(async (usuario) => {
      if (usuario) {
        const validPassword = await compareHash(senha, usuario.senha);
        if (validPassword) {
          const token = generateToken(usuario.id);
          res.status(status.OK).send({ token });
        } else {
          res.status(status.UNAUTHORIZED).send("Senha incorreta!");
        }
      } else {
        res.status(status.NOT_FOUND).send("Nenhum usuário com esse nome!");
      }
    })
    .catch((error) => next(error));
};
exports.ME = async (req, res, next) => {
  res.status(status.OK).send(req.user);
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
