const express = require("express");
const auth = require("../middleware/auth.middleware");
const BookModel = require("../models/book.model");

const libRouter = express.Router();

libRouter.post("/books", auth, async (req, res) => {
  const { title, author, price, role, user_id } = req.body;
 
  if (role.includes("creator")) {
    const book = new BookModel({ title, author, price, user_id });
    await book.save();
    res.status(200).send({"msg":"New book added to DB"});
  } else {
    res.send({"msg":"Not authorised to add books."});
  }
});

libRouter.get("/books", auth, async (req, res) => {
  const { role, user_id } = req.body;
  if (role.includes("view_all")) {
    const books = await BookModel.find();
    res.send(books);
  }
  if (role.includes("creator")) {
    const books = await BookModel.find({ user_id });
    res.send(books);
  }
});

libRouter.delete("/delete/:id", auth, async (req, res) => {
  const { role, user_id } = req.body;
  const id = req.params.id;
  if (role.includes("creator")) {
    await BookModel.deleteOne({ _id: id });
    res.status(200).send({"msg":"Book deleted from DB successfully"});
  }
});

libRouter.get("/view", auth, async (req, res) => {
  const query = req.query;
  try {
    const currentTime = new Date();
    const tenMinutesAgo = new Date(currentTime.getTime() - 10 * 60 * 1000);
    if (query.old) {
      const oldBooks = await BookModel.find({
        createdAt: {
          $lte: tenMinutesAgo,
        },
      });

      if (oldBooks.length > 0) {
        res.status(200).send(oldBooks);
      } else {
        res.status(200).send({"msg":"No older books available"});
      }
    } else if (query.new) {
      const newBooks = await BookModel.find({
        createdAt: {
          $gte: tenMinutesAgo,
        },
      });

      if (newBooks.length > 0) {
        res.status(200).send(newBooks);
      } else {
        res.status(200).send({"msg":"No new books available"});
      }
    }
  } catch (error) {
    res.status(500).send({"msg":"Something went wrong"});
  }
});

module.exports = libRouter;
