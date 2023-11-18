const Table = require("../models/Table");

class TableService {
  async getAllTables() {
    return Table.find();
  }

  async createTable(data) {
    const table = new Table(data);
    return table.save();
  }

  async getTableById(id) {
    return Table.findById(id);
  }

  async getTablesByIds(tableIdsArray) {
    const tableIds = tableIdsArray.flat();

    return Table.find({ _id: { $in: tableIds } });
  }

  async updateTable(id, updateData) {
    return Table.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTable(id) {
    return Table.findByIdAndDelete(id);
  }

  async createTables(tablesData) {
    return Table.insertMany(tablesData);
  }
}

module.exports = new TableService();
