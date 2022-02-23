const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // https://mongoosejs.com/docs/deprecations.html#
    });
    console.log(`Database Connected Succesfully`);
  } catch (error) {
    console.log(`Error ${error.message}`);
  }
};

module.exports = dbConnect;