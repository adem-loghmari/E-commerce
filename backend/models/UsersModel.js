const mongoose = require("mongoose");

const Users = mongoose.model("Users", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
});

module.exports = Users;
