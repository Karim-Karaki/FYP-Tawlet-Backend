const ReservationService = require("../services/reservationServices");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = require("twilio")(accountSid, authToken);

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
      const reservations = await ReservationService.getBayyak(restaurantId);
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getReservationsByRestaurantAndDate(req, res) {
    try {
      const { restaurantId } = req.params;
      const { date } = req.query;
      console.log(restaurantId, date);
      const reservations =
        await ReservationService.getReservationsByRestaurantAndDate(
          restaurantId,
          date
        );
      res.json(reservations);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async confirmReservation(req, res) {
    try {
      const reservationId = req.params.id;
      const status = "Confirmed";

      const updatedReservation =
        await ReservationService.updateReservationStatus(reservationId, status);

      //get the guest id from the reservation and then get the phoneNumber from the guestid

      const reservation = await ReservationService.getReservationById(
        reservationId
      );
      const guestId = reservation.guestId;
      const guest = await Guest.findById(guestId);
      const phoneNumber = guest.phoneNumber;

      const confirmationCheck = await client.verify
        .services(process.env.TWILIO_VERIFY_SID)
        .verificationChecks.create({ to: phoneNumber, code });

      if (confirmationCheck.status === "approved") {
        res.send({ verified: true, message, guest });
      } else {
        res.send({ verified: false, message });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new ReservationController();
