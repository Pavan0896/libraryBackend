const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: String, require: true },
    role: {
      type: [
        {
          type: String,
          require: true,
          enum: ["creator", "viewer", "view_all"],
        },
      ],
      default: ["creator","viewer"],
    },
    email: { type: String, require: true },
    password: { type: String, require: true },
  },
  {
    versionkey: false,
  }
);

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
