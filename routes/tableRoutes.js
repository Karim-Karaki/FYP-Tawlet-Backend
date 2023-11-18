const express = require("express");
const tableController = require("../controllers/tableController");

const router = express.Router();

router.get("/", tableController.getAllTables);
router.post("/", tableController.createTable);
router.get("/:id", tableController.getTableById);
router.post("/", tableController.createTable);
router.post("/bulk", tableController.createTables);
router.put("/:id", tableController.updateTable);
router.delete("/:id", tableController.deleteTable);
router.post("/getTablesByIds", tableController.getTablesByIds);

module.exports = router;
