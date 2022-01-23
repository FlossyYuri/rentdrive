const express = require("express");
const { isAdmin } = require("../config/authValidation");
const router = express.Router();
const FuncionarioController = require("../controllers/funcionarios");

router.post("/", FuncionarioController.Insert);
router.get("/", isAdmin, FuncionarioController.SearchAll);
router.get("/:id", isAdmin, FuncionarioController.SearchOne);
router.put("/:id", isAdmin, FuncionarioController.Update);
router.delete("/:id", isAdmin, FuncionarioController.Delete);

module.exports = router;
