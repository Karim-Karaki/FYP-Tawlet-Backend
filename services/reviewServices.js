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
    return Review.find({ restaurantId: restaurantId }).populate(
      "guestId",
      "name"
    );
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

  async getAverageRatingByRestaurant(restaurantId) {
    const reviews = await Review.find({ restaurantId: restaurantId });
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    const totalReviews = reviews.length;
    return { averageRating, totalReviews };
  }
}

module.exports = new ReviewService();
