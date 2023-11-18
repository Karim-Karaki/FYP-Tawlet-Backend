const Menu = require("../models/Menu");

class MenuService {
  async getAllMenus() {
    return Menu.find();
  }

  async createMenu(data) {
    const menu = new Menu(data);
    return menu.save();
  }

  async getMenuById(id) {
    return Menu.findById(id);
  }

  async updateMenu(id, updateData) {
    return Menu.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteMenu(id) {
    return Menu.findByIdAndDelete(id);
  }
}

module.exports = new MenuService();
