const express = require("express");
const { isAdmin } = require("../config/authValidation");
const router = express.Router();
const ViaturaController = require("../controllers/viaturas");

router.post("/", ViaturaController.Insert);
router.get("/", isAdmin, ViaturaController.SearchAll);
router.get("/:id", isAdmin, ViaturaController.SearchOne);
router.put("/:id", isAdmin, ViaturaController.Update);
router.delete("/:id", isAdmin, ViaturaController.Delete);

module.exports = router;
