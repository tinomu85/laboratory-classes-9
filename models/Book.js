const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  year: Number,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
});

module.exports = mongoose.model("Book", bookSchema);
