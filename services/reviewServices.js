const Review = require("../models/Review");

class ReviewService {
  async getAllReviews() {
    return Review.find({});
  }

  async createReview(data) {
    const review = new Review(data);
    return review.save();
  }

  async getReviewById(id) {
    return Review.findById(id);
  }

  async updateReview(id, updateData) {
    return Review.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteReview(id) {
    return Review.findByIdAndDelete(id);
  }

  async getAllReviewsByRestaurant(restaurantId) {
    return Review.find({ restaurantId: restaurantId });
  }

  async createReview(reviewData) {
    const review = new Review(reviewData);
    return review.save();
  }

  async getAllReservationsByRestaurant(restaurantId) {
    return Reservation.find({ restaurantId: restaurantId });
  }

  async getAllReservationsByRestaurantAndDate(restaurantId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return Reservation.find({
      restaurantId: restaurantId,
      time: { $gte: startOfDay, $lte: endOfDay },
    });
  }
}

module.exports = new ReviewService();
