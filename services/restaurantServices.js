const Restaurant = require("../models/Restaurant");

class RestaurantService {
  async getAllRestaurants() {
    return Restaurant.find();
  }

  async createRestaurant(data) {
    const restaurant = new Restaurant(data);
    return restaurant.save();
  }

  async getRestaurantById(id) {
    return Restaurant.findById(id);
  }

  async updateRestaurant(id, updateData) {
    return Restaurant.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteRestaurant(id) {
    return Restaurant.findByIdAndDelete(id);
  }

  async getLayout(restaurantId) {
    const restaurant = await Restaurant.findById(restaurantId);
    return restaurant ? restaurant.layout : null;
  }

  async updateLayout(restaurantId, newLayout) {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    restaurant.layout = newLayout;
    await restaurant.save();
    return restaurant.layout;
  }

  //get menu
  async getMenu(restaurantId) {
    const restaurant = await Restaurant.findById(restaurantId);
    return restaurant ? restaurant.menu : null;
  }

  //add menu item
  async addMenuItem(restaurantId, menuItem) {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    restaurant.menu.push(menuItem);
    await restaurant.save();
    return restaurant.menu;
  }

  //add table to layout
  async addTableToLayout(restaurantId, table) {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    restaurant.layout.push(table);
    await restaurant.save();
    return restaurant.layout;
  }

  async getRestaurantByCuisine(cuisine) {
    return Restaurant.find({ cuisine });
  }

  async getTotalRestaurants() {
    return Restaurant.countDocuments();
  }

  async updateMenu(restaurantId, newMenu) {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    restaurant.menu = newMenu;
    await restaurant.save();
    return restaurant.menu;
  }
}

module.exports = new RestaurantService();
