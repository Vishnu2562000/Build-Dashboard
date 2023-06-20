const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const router  = require('./config/routes')
const port = process.env.PORT || 3005;
app.use(cors())
app.use(express.json());
const configureDb = require("./config/database");
configureDb();
app.use(function (req, res, next) {
  console.log(`${req.method}-${req.url}-${req.ip}-${Date.now}`);
  next();
});
app.use(router)
app.listen(port, () => {
    console.log("server is running on",port);
  });