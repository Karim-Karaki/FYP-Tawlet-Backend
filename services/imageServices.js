const Restaurant = require("../models/Restaurant");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const fs = require("fs");
const path = require("path");

class ImageServices {
  //get all images of a restaurant

  async getRestaurantImages() {
    const restaurant = await Restaurant.findById(req.params.id);
    return restaurant.images;
  }

  //add image to restaurant
  async addRestaurantImage(req) {
    //adding the image is just adding a string
    //to the images array in the restaurant schema
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.images.push(req.body.image);
    await restaurant.save();

    return restaurant.images;
  }

  //change layout
  async changeLayout(req) {
    const restaurant = await Restaurant.findById(req.params.id);
    restaurant.layout = req.body.layout;
    await restaurant.save();

    return restaurant.layout;
  }

  //get layout
  async getLayout(req) {
    const restaurant = await Restaurant.findById(req.params.id);
    return restaurant.layout;
  }
}

module.exports = new ImageServices();
