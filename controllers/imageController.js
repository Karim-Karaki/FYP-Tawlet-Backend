const ImageService = require("../services/imageServices");

class ImageController {
  async getRestaurantImages(req, res) {
    try {
      await ImageService.getRestaurantImages();
      res.status(200).send("Image retrieved from S3");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async addRestaurantImage(req, res) {
    try {
      await ImageService.addRestaurantImage();
      res.status(200).send("Image added to S3");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async changeLayout(req, res) {
    try {
      await ImageService.changeLayout();
      res.status(200).send("Layout changed");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getLayout(req, res) {
    try {
      await ImageService.getLayout();
      res.status(200).send("Layout retrieved");
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

module.exports = new ImageController();
