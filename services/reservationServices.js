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

  async updateReservationStatus(reservationId, status) {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: status },
      { new: true }
    );

    if (!updatedReservation) {
      throw new Error("Reservation not found");
    }

    return updatedReservation;
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
