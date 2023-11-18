const Reservation = require("../models/Reservation");

class ReservationService {
  async getAllReservations() {
    return Reservation.find();
  }

  async createReservation(data) {
    const reservation = new Reservation(data);
    return reservation.save();
  }

  async getReservationById(id) {
    return Reservation.findById(id);
  }

  async updateReservation(id, updateData) {
    return Reservation.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteReservation(id) {
    return Reservation.findByIdAndDelete(id);
  }
}

module.exports = new ReservationService();
