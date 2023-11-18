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
    const restaurant = await Restaurant.findById(restaurantId).populate(
      "layout"
    );
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
}

module.exports = new RestaurantService();
