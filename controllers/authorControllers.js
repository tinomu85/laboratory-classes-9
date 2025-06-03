const Author = require("../models/Author");

exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    console.error("Błąd w uzyskaniu autorów:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    const updatedAuthor = await Author.findByIdAndUpdate(
      id,
      { firstName, lastName },
      { new: true }
    );

    if (!updatedAuthor) {
      return res.status(404).json({ error: "Nie znaleziono autora" });
    }

    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error("Błąd podczas aktualizacji autora:", error);
    res.status(500).json({ error: "Błąd serwera" });
  }
};
