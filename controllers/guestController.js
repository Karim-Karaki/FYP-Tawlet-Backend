const GuestService = require("../services/guestServices");

class GuestController {
  async getAllGuests(req, res) {
    try {
      const guests = await GuestService.getAllGuests();
      res.json(guests);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async createGuest(req, res) {
    try {
      const guest = await GuestService.createGuest(req.body);
      res.status(201).json(guest);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async getTotalGuests(req, res) {
    try {
      const totalGuests = await GuestService.getTotalGuests();
      res.status(200).json({ totalGuests });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getGuestById(req, res) {
    try {
      const { id } = req.params;
      const guest = await GuestService.getGuestById(id);
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      res.status(200).json(guest);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async getGuestByPhoneNumber(req, res) {
    try {
      const { phoneNumber } = req.params;
      const guest = await GuestService.getGuestByPhoneNumber(phoneNumber);
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      res.status(200).json(guest);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async updateGuest(req, res) {
    try {
      const { id } = req.params;
      const guest = await GuestService.updateGuest(id, req.body);
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      res.status(200).json(guest);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  async deleteGuest(req, res) {
    try {
      const { id } = req.params;
      const guest = await GuestService.deleteGuest(id);
      if (!guest) {
        return res.status(404).json({ message: "Guest not found" });
      }
      res.status(200).json({ message: "Guest deleted" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new GuestController();
