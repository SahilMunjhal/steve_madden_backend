const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://vattsalbhatt:vattsal_123@cluster0.6plmd.mongodb.net/steve_madden"
  );
};
