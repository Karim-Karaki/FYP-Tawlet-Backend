const TableService = require("../services/tableServices");

class TableController {
  async getAllTables(req, res) {
    try {
      const tables = await TableService.getAllTables();
      res.json(tables);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createTable(req, res) {
    try {
      const table = await TableService.createTable(req.body);
      res.status(201).json(table);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTableById(req, res) {
    try {
      const { id } = req.params;
      const table = await TableService.getTableById(id);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.json(table);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateTable(req, res) {
    try {
      const { id } = req.params;
      const table = await TableService.updateTable(id, req.body);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.json(table);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteTable(req, res) {
    try {
      const { id } = req.params;
      const table = await TableService.deleteTable(id);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.json({ message: "Table deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getTablesByIds(req, res) {
    try {
      const tableIds = req.body;
      const tables = await TableService.getTablesByIds(tableIds);
      res.json(tables);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createTables(req, res) {
    try {
      const tables = await TableService.createTables(req.body);
      res.status(201).json(tables);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = new TableController();
