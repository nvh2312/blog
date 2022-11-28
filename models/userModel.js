const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Vui lòng cung cấp username!"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Vui lòng cung cấp password!"],
  },
  name: {
    type: String,
    required: [true, "Vui lòng cung cấp tên!"],
  },
  avatar: {
    type: String,
    default:
      "https://png.pngtree.com/png-clipart/20200701/original/pngtree-default-avatar-png-image_5407175.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
userSchema.index({ "$**": "text" });

const User = mongoose.model("User", userSchema);

module.exports = User;
