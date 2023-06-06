const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DATABASE IS CONNECTED");
  } catch (error) {
    console.log(error);
    throw new Error("DATABASE IS NOT CONNECTED");
  }
};

module.exports = { dbConnection };
