require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then((e) => {
    console.log("connected to database Successfuly");
    app.listen(PORT, () => {
      console.log(`server is running on PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
