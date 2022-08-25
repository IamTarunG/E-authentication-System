const mongoose = require("mongoose");
const connectToDB = async () => {
  const url = process.env.MONGO_URL;
  await mongoose.connect(url, () => console.log('connected to mongo'))
};
module.exports = connectToDB;
