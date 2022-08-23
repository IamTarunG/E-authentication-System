const Book = require("../model/book.js");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel.js");
const getData = asyncHandler(async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id });

    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

const postData = asyncHandler(async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      user: req.user.id,
    });
    res.status(200).json(newBook);
  } catch (error) {
    res.status(400).json(error.message);
  }
});
const updateData = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404).json("Book not found");
  }

  if (!req.user) {
    res.status(404).json("User not found");
  }
  if (book.user.toString() !== req.user.id) {
    res.status(400).json("User not authorized");
  }
  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBook);
});
const deleteData = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404).json("Book not found");
  }
  if (!req.user) {
    res.status(404).json("User not found");
  }
  if (book.user.toString() !== req.user.id) {
    res.status(400).json("User not authenticated");
  }
  await book.remove();
  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getData,
  postData,
  updateData,
  deleteData,
};
