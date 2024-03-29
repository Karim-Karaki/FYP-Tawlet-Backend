const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("/", reviewController.getAllReviews);
router.post("/", reviewController.createReview);
router.get("/:id", reviewController.getReviewById);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);
router.get(
  "/restaurant/:restaurantId",
  reviewController.getAllReviewsByRestaurant
);
router.post(
  "/restaurant/:restaurantId",
  reviewController.createReviewForRestaurant
);

router.get(
  "/restaurant/:restaurantId/average",
  reviewController.getAverageRatingByRestaurant
);

module.exports = router;
