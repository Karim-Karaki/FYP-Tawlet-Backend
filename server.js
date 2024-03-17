const express = require("express");
const connectDB = require("./config/database");
const morgan = require("morgan");

//cors
const cors = require("cors");
// Routes
const restaurantRoutes = require("./routes/restaurantRoutes");
const guestRoutes = require("./routes/guestRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const tableRoutes = require("./routes/tableRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const twilioRoutes = require("./routes/twilioRoutes");

const app = express();
connectDB();

app.use(express.json());

app.use(morgan("combined"));

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcom to the Tawlet Backend API!");
});

// Routes middleware
app.use("/restaurants", restaurantRoutes);
app.use("/guest", guestRoutes);
app.use("/reservation", reservationRoutes);
app.use("/table", tableRoutes);
app.use("/review", reviewRoutes);
app.use("/twilio", twilioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
