const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    author: { type: String, require: true },
    price: { type: Number, require: true },
    user_id: { type: String, require: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
