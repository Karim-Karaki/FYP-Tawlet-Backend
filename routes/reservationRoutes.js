const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

router.get("/", reservationController.getAllReservations);
router.post("/", reservationController.createReservation);
router.get("/:id", reservationController.getReservationById);
router.put("/:id", reservationController.updateReservation);
router.delete("/:id", reservationController.deleteReservation);

router.get("/guest/:guestId", reservationController.getAllReservationsByGuest);

router.get("/table/:tableId", reservationController.getAllReservationsByTable);

router.get(
  "/restaurant/:restaurantId",
  reservationController.getAllReservationsByRestaurant
);
router.get(
  "/restaurant/:restaurantId/date",
  reservationController.getReservationsByRestaurantAndDate
);

router.put("/confirm/:id", reservationController.confirmReservation);

module.exports = router;
