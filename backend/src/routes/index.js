const express = require("express");
const router = express.Router();
const usuarios = require("./usuarios");
const funcionarios = require("./funcionarios");
const viaturas = require("./viaturas");
const clientes = require("./clientes");
const aluguer = require("./aluguer");
const dashboard = require("./dashboard");
const auth = require("./auth");

router.use("/usuarios", usuarios);
router.use("/funcionarios", funcionarios);
router.use("/viaturas", viaturas);
router.use("/clientes", clientes);
router.use("/alugueres", aluguer);
// router.use("/dashboard", authenticateToken, dashboard);
router.use("/dashboard", dashboard);
router.use("/auth", auth);
router.use("/*", (_, res) => res.send("OK!"));

module.exports = router;
