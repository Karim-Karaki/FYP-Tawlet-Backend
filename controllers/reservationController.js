const ReservationService = require("../services/reservationServices");

class ReservationController {
  async getAllReservations(req, res) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createReservation(req, res) {
    try {
      const reservation = await ReservationService.createReservation(req.body);
      res.status(201).json(reservation);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getReservationById(req, res) {
    try {
      const { id } = req.params;
      const reservation = await ReservationService.getReservationById(id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.json(reservation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateReservation(req, res) {
    try {
      const { id } = req.params;
      const reservation = await ReservationService.updateReservation(
        id,
        req.body
      );
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.json(reservation);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteReservation(req, res) {
    try {
      const { id } = req.params;
      const reservation = await ReservationService.deleteReservation(id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.json({ message: "Reservation deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllReservationsByGuest(req, res) {
    try {
      const { guestId } = req.params;
      const reservations = await ReservationService.getAllReservationsByGuest(
        guestId
      );
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllReservationsByTable(req, res) {
    try {
      const { tableId } = req.params;
      const reservations = await ReservationService.getAllReservationsByTable(
        tableId
      );
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllReservationsByRestaurant(req, res) {
    try {
      const { restaurantId } = req.params;
      const reservations =
        await ReservationService.getAllReservationsByRestaurant(restaurantId);
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getAllReservationsByRestaurantAndDate(req, res) {
    try {
      const { restaurantId } = req.params;
      const { date } = req.query;
      const reservations =
        await ReservationService.getAllReservationsByRestaurantAndDate(
          restaurantId,
          date
        );
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Add methods for upcoming reservations and reservation history if needed
}

module.exports = new ReservationController();
