const express = require("express");
const { isAdmin } = require("../config/authValidation");
const router = express.Router();
const UsuarioController = require("../controllers/usuarios");

router.post("/", UsuarioController.Insert);
router.get("/", isAdmin, UsuarioController.SearchAll);
router.get("/:id", isAdmin, UsuarioController.SearchOne);
router.put("/:id", isAdmin, UsuarioController.Update);
router.delete("/:id", isAdmin, UsuarioController.Delete);

module.exports = router;
