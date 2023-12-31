// const  {MongoClient} = require('mongodb')
const mongoose = require("mongoose");

const configureDb = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const url = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.zcc6sgw.mongodb.net/?retryWrites=true&w=majority`;
  mongoose
    .connect(url, connectionParams)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("MongoDB err :", err);
    });
};

module.exports = configureDb;
