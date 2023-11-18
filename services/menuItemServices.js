const MenuItem = require("../models/MenuItem");

class MenuItemService {
  async getAllMenuItems() {
    return MenuItem.find();
  }

  async createMenuItem(data) {
    const menuItem = new MenuItem(data);
    return menuItem.save();
  }

  async getMenuItemById(id) {
    return MenuItem.findById(id);
  }

  async updateMenuItem(id, updateData) {
    return MenuItem.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteMenuItem(id) {
    return MenuItem.findByIdAndDelete(id);
  }
}

module.exports = new MenuItemService();
