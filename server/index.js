const express = require("express");
require("dotenv").config();
require("express-async-errors");
const app = express();
const cors = require("cors");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/custom-errorHandler");
const { authentication, verifyAdmin } = require("./middleware/authentication");
const connectDB = require("./db/connect");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const propertyRouter = require("./routes/propertyRouter");
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to the home router" });
});

app.use("/api/v1/auth/", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`server is listening on ${port}`);
  });
};
start();
