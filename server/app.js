const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

//import routes
const authRoute = require("./routes/authRoute");
const verifyRoute = require("./routes/dashboard");
const pageRoute = require("./routes/pageRoute");
const otpRoute = require("./routes/otpRoute");

//loads environment variables
dotenv.config();

//Connection to DB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to MongoDB");
});
connection.once("error", () => {
  console.log("Database connectivity error");
});

//allow cross origin requests
app.use(cors());

//middleware function which parses incoming requests
app.use(express.json());

//Middleware Route
app.use("/authApi", authRoute);
app.use("/verify", verifyRoute);
app.use("/api", pageRoute);
app.use('/otp',otpRoute);

app.get("/", (req, res) => {
  res.send("Welcome to CMS App Node server1");
});

// const port = process.env.PORT || 3000;
app.listen(process.env.PORT || 8081, () => console.log("Server is running"));
