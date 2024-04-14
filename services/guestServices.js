const Guest = require("../models/Guest");

class GuestService {
  async getAllGuests() {
    return Guest.find();
  }

  async createGuest(guestData) {
    const guest = new Guest(guestData);
    return guest.save();
  }

  async getGuestById(id) {
    return Guest.findById(id);
  }

  async getGuestByPhoneNumber(phoneNumber) {
    return Guest.findOne({ phoneNumber });
  }

  async updateGuest(id, updateData) {
    return Guest.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteGuest(id) {
    return Guest.findByIdAndDelete(id);
  }

  async getTotalGuests() {
    return Guest.countDocuments();
  }
}

module.exports = new GuestService();
