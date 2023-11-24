const RestaurantService = require("../services/restaurantServices");

class RestaurantController {
  async getAllRestaurants(req, res) {
    try {
      const restaurants = await RestaurantService.getAllRestaurants();
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createRestaurant(req, res) {
    try {
      const restaurant = await RestaurantService.createRestaurant(req.body);
      res.status(201).json(restaurant);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getRestaurantById(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await RestaurantService.getRestaurantById(id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateRestaurant(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await RestaurantService.updateRestaurant(id, req.body);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json(restaurant);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteRestaurant(req, res) {
    try {
      const { id } = req.params;
      const restaurant = await RestaurantService.deleteRestaurant(id);
      if (!restaurant) {
        return res.status(404).json({ message: "Restaurant not found" });
      }
      res.json({ message: "Restaurant deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  async getLayout(req, res) {
    try {
      const { id } = req.params;
      const layout = await RestaurantService.getLayout(id);
      if (!layout) {
        return res.status(404).json({ message: "Layout not found" });
      }
      res.json(layout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateLayout(req, res) {
    try {
      const { id } = req.params;
      const updatedLayout = await RestaurantService.updateLayout(id, req.body);
      res.json(updatedLayout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getRestaurantByCuisine(req, res) {
    try {
      const { type } = req.params;
      const restaurants = await RestaurantService.getRestaurantByCuisine(type);
      res.json(restaurants);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getMenu(req, res) {
    try {
      const { id } = req.params;
      const menu = await RestaurantService.getMenu(id);
      if (!menu) {
        return res.status(404).json({ message: "Menu not found" });
      }
      res.json(menu);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async addMenuItem(req, res) {
    try {
      const { id } = req.params;
      const updatedMenu = await RestaurantService.addMenuItem(id, req.body);
      res.json(updatedMenu);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async addTableToLayout(req, res) {
    try {
      const { id } = req.params;
      const updatedLayout = await RestaurantService.addTableToLayout(
        id,
        req.body
      );
      res.json(updatedLayout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new RestaurantController();
