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
}

module.exports = new ReviewService();
