const Table = require("../models/Table");
const Reservation = require("../models/Reservation");

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

  // Continuing from your existing TableService class...

  async getTablesByRestaurantId(restaurantId) {
    return Table.find({ restaurantId });
  }

  async getAvailableTables(restaurantId, date, timeSlot) {
    console.log(restaurantId, date, timeSlot);
    const reservedTableIds = await Reservation.find(
      {
        restaurantId,
        date,
        timeSlot,
        status: { $ne: "Cancelled" },
      },
      "tableId"
    ).distinct("tableId");
    console.log(reservedTableIds);

    return Table.find({
      restaurantId,
      _id: { $nin: reservedTableIds },
    });
  }

  async createTables(bulkTableData) {
    return Table.insertMany(bulkTableData);
  }

  //
}

module.exports = new TableService();
