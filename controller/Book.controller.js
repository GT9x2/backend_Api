const Book = require("../model/Book.model");

const getAll = async (req, res) => {
  try {
    const BookList = await Book.findAll();
    console.log("Get books all ", BookList);
    res.status(200).json({ BookList });
  } catch (err) {
    console.log(err);
    res.status(500).send("Have error on Server! ");
  }
};

const createBook = async (req, res) => {
  const { name, type, title, image, publisher } = req.body;
  if (!name || !type || !title || !image || !publisher) {
    return res.status(400).send("Please input something");
  }
  try {
    const result = await Book.create({ name, type, title, image, publisher });
    res.status(201).json({ result });
  } catch (err) {
    console.log("error", err);
    res.status(500);
  }
};

const getBookId = async (req, res) => {
  try {
    const idBook = req.params.id;
    const Books = await Book.findOne({ where: { id: idBook } });
    res.status(200).json({ Books });
  } catch (err) {
    console.log("err", err);
    res.status(500);
  }
};
const editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id || !data) {
      res.status(404).send("Not find element");
    }
    const books = { where: { id: id } };
    await Book.update(data, books);
    res.status(200).json({
      books,
      data,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500);
  }
};

const deleteId = async (req, res) => {
  const idDel = req.params.id;
  try {
    const books = await Book.destroy({ where: { id: idDel } });
    console.log(books);
    if (books == 0) {
      return res.status(404).send("Fail");
    }
    res.status(200).json({
      books,
    });
  } catch (err) {
    console.log("err", err);
    res.status(500);
  }
};

module.exports = { getAll, createBook, getBookId, editBook, deleteId };
