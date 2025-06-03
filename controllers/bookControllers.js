const Book = require("../models/Book");
const Author = require("../models/Author");

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.status(200).json(books);
  } catch (error) {
    console.error("Błąd w odbiorze książek:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, year, author } = req.body;

    const existingAuthor = await Author.findById(author);
    if (!existingAuthor) {
      return res.status(404).json({ error: "Nie znaleziono autora" });
    }

    const newBook = new Book({
      title,
      year,
      author,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Błąd podczas tworzenia książki:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Nie znaleziono książki" });
    }

    res.status(204).send();
  } catch (error) {
    console.error("Błąd podczas usuwania książki:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
};
