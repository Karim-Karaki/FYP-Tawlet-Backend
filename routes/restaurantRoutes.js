const express = require("express");
const restaurantController = require("../controllers/restaurantController");

const router = express.Router();

router.get("/", restaurantController.getAllRestaurants);
router.post("/", restaurantController.createRestaurant);
router.get("/:id", restaurantController.getRestaurantById);
router.put("/:id", restaurantController.updateRestaurant);
router.delete("/:id", restaurantController.deleteRestaurant);
router.get("/:id/layout", restaurantController.getLayout);
router.put("/:id/layout", restaurantController.updateLayout);

module.exports = router;
