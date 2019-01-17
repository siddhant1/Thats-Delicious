const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyparser = require("body-parser");
const helmet = require("helmet");
const mongoose = require("mongoose");
//Custom routes
const store = require("./Routes/Store");

// Load Environment Variables
dotenv.config();

//Connect to database
mongoose.connect(
  `mongodb://${process.env.DB_USERNAME}:${
    process.env.DB_PASSWORD
  }@ds161740.mlab.com:61740/restaurant"`,
  () => {
    console.log("Connected to databse");
  }
);
mongoose.Promise = global.Promise;

//Parsing middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

//Headers middleware
app.use(helmet());
app.use(helmet.noCache());

//Logging middlewares
app.use(morgan("dev"));

app.use("/api/store", store);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port" + PORT);
});
