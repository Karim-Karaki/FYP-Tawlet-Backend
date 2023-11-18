const MenuItemService = require("../services/menuItemServices");

class MenuItemController {
  async getAllMenuItems(req, res) {
    try {
      const menuItems = await MenuItemService.getAllMenuItems();
      res.json(menuItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createMenuItem(req, res) {
    try {
      const menuItem = await MenuItemService.createMenuItem(req.body);
      res.status(201).json(menuItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getMenuItemById(req, res) {
    try {
      const { id } = req.params;
      const menuItem = await MenuItemService.getMenuItemById(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu Item not found" });
      }
      res.json(menuItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateMenuItem(req, res) {
    try {
      const { id } = req.params;
      const menuItem = await MenuItemService.updateMenuItem(id, req.body);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu Item not found" });
      }
      res.json(menuItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteMenuItem(req, res) {
    try {
      const { id } = req.params;
      const menuItem = await MenuItemService.deleteMenuItem(id);
      if (!menuItem) {
        return res.status(404).json({ message: "Menu Item not found" });
      }
      res.json({ message: "Menu Item deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new MenuItemController();
