const express = require("express");
const connectDB = require("./config/db");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

//initialize DB
connectDB();

//initialize common middlewares
app.use([
  express.json(),
  express.urlencoded({ extended: false }),
  morgan("dev"),
]);

//health route
app.get("/health", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});
//api routes
app.use("/", require("./routes/server.route"));

//error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

//start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
