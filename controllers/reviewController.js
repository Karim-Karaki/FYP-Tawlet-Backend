const ReviewService = require("../services/reviewServices");

class ReviewController {
  async createReview(req, res) {
    try {
      const review = await ReviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ error: "Error creating review" });
    }
  }

  async getAllReviews(req, res) {
    try {
      const reviews = await ReviewService.getAllReviews();
      res.status(200).json(reviews);
    } catch (err) {
      res.status(400).json({ error: "Error fetching reviews" });
    }
  }

  async getReviewById(req, res) {
    try {
      const review = await ReviewService.getReviewById(req.params.id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.status(200).json(review);
    } catch (err) {
      res.status(400).json({ error: "Error fetching review" });
    }
  }

  async updateReview(req, res) {
    try {
      const review = await ReviewService.updateReview(req.params.id, req.body);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.status(200).json(review);
    } catch (err) {
      res.status(400).json({ error: "Error updating review" });
    }
  }

  async deleteReview(req, res) {
    try {
      const review = await ReviewService.deleteReview(req.params.id);
      if (!review) return res.status(404).json({ error: "Review not found" });
      res.status(200).json({ message: "Review deleted" });
    } catch (err) {
      res.status(400).json({ error: "Error deleting review" });
    }
  }

  async getAllReviewsByRestaurant(req, res) {
    try {
      const { restaurantId } = req.params;
      const reviews = await ReviewService.getAllReviewsByRestaurant(
        restaurantId
      );
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createReviewForRestaurant(req, res) {
    try {
      const { restaurantId } = req.params;
      const reviewData = { ...req.body, restaurantId };
      const review = await ReviewService.createReview(reviewData);
      res.status(201).json(review);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getAverageRatingByRestaurant(req, res) {
    try {
      //add a part to get the totalt number of reviews

      const { restaurantId } = req.params;
      const averageRating = await ReviewService.getAverageRatingByRestaurant(
        restaurantId
      );
      res.json(averageRating);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ReviewController();
