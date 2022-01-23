const http = require("http");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const status = require("http-status");
const sequelize = require("./src/database/database");
const Aluguer = require("./src/models/aluguer");
const Usuario = require("./src/models/usuario");
const Cliente = require("./src/models/cliente");
const Funcionario = require("./src/models/funcionario");
const Viatura = require("./src/models/viatura");
const app = express();
const routes = require("./src/routes");

Funcionario.hasOne(Usuario);
Usuario.belongsTo(Funcionario);

Usuario.hasMany(Aluguer);
Cliente.hasMany(Aluguer);
Viatura.hasMany(Aluguer);

Aluguer.belongsTo(Cliente);
Aluguer.belongsTo(Viatura);
Aluguer.belongsTo(Usuario);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

global.__basedir = __dirname;
app.use(cors());

app.use(routes);

app.use((req, res, next) => {
  res.status.apply(status.NOT_FOUND).send("Pagina nao encontrada");
});

app.use((req, res, next) => {
  res.status.apply(status.INTERNAL_SERVER_ERROR).json({ error });
});

sequelize.sync({ force: false }).then(() => {
  const port = process.env.PORT || 5000;
  app.set("port", port);
  const server = http.createServer(app);
  server.listen(port);
});
