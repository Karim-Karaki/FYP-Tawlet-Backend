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

  async getAllReservationsByGuest(guestId) {
    return Reservation.find({ guestId: guestId });
  }

  async getAllReservationsByTable(tableId) {
    return Reservation.find({ tableId: tableId });
  }

  async getBayyak(restaurantId) {
    return Reservation.find({ restaurantId: restaurantId });
  }

  async getReservationsByRestaurantAndDate(restaurantId, date) {
    const reservations = await Reservation.find({
      restaurantId: restaurantId,
      date: date,
    })
      .populate("tableId", "tableNumber")
      .populate("guestId", "name");
    //populate tableId by tableNumber
    console.log(reservations);
    return reservations;
  }
}

module.exports = new ReservationService();
