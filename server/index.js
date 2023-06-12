const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/custom-errorHandler");
const { authentication } = require("./middleware/authentication");
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const propertyRouter = require("./routes/propertyRouter");
const publicPropertyRouter = require("./routes/publicPropertyRouter");
const reservationRouter = require("./routes/reservationRouter");
const favouritesRouter = require("./routes/favouritesRouter");
const port = process.env.PORT || 5000;

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 10 minutes
    max: 100, // 100 requests per IP
  })
);
app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to the shortlet home router" });
});

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users", authentication, userRouter);
app.use("/api/v1/public/properties", publicPropertyRouter);
app.use("/api/v1/properties", authentication, propertyRouter);
app.use("/api/v1/favourites", authentication, favouritesRouter);
app.use("/api/v1/reservations", reservationRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });
};
start();
