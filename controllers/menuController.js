const MenuService = require("../services/menuServices");

class MenuController {
  async getAllMenus(req, res) {
    try {
      const menus = await MenuService.getAllMenus();
      res.json(menus);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createMenu(req, res) {
    try {
      const menu = await MenuService.createMenu(req.body);
      res.status(201).json(menu);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getMenuById(req, res) {
    try {
      const { id } = req.params;
      const menu = await MenuService.getMenuById(id);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res.json(menu);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateMenu(req, res) {
    try {
      const { id } = req.params;
      const menu = await MenuService.updateMenu(id, req.body);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res.json(menu);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteMenu(req, res) {
    try {
      const { id } = req.params;
      const menu = await MenuService.deleteMenu(id);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res.json({ message: "Menu deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new MenuController();
