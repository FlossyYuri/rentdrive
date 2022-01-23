const express = require("express");
const { isAdmin } = require("../config/authValidation");
const router = express.Router();
const AluguerController = require("../controllers/aluguer");

router.post("/", AluguerController.Insert);
router.get("/", isAdmin, AluguerController.SearchAll);
router.get("/:id", isAdmin, AluguerController.SearchOne);
router.put("/:id", isAdmin, AluguerController.Update);
router.delete("/:id", isAdmin, AluguerController.Delete);

module.exports = router;
