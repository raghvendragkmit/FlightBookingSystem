const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
const authRouter = require("./routes/auth.route");
const routeRouter = require("./routes/routes.route");
const flightRouter = require("./routes/flight.route");
const discountRouter = require("./routes/discount.route");
const bookingRouter = require("./routes/booking.route");
const paymentRouter = require("./routes/payment.route");

const { db, myfun } = require("./models/Index");
dotenv.config();

myfun();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api", routeRouter);
app.use("/api", flightRouter);
app.use("/api", discountRouter);
app.use("/api", bookingRouter);
app.use("/api", paymentRouter);
module.exports = app;
