const express = require("express");
const router = express.Router();

const imageController = require("../controllers/imageController");

router.get("/restaurant/", imageController.getRestaurantImages);
router.post("/restaurant", imageController.addRestaurantImage);
router.put("/restaurant/:id/layout", imageController.changeLayout);
router.get("/restaurant/:id/layout", imageController.getLayout);

module.exports = router;
