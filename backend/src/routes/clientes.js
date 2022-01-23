const express = require("express");
const { isAdmin } = require("../config/authValidation");
const router = express.Router();
const ClienteController = require("../controllers/clientes");

router.post("/", ClienteController.Insert);
router.get("/", isAdmin, ClienteController.SearchAll);
router.get("/:id", isAdmin, ClienteController.SearchOne);
router.put("/:id", isAdmin, ClienteController.Update);
router.delete("/:id", isAdmin, ClienteController.Delete);

module.exports = router;
