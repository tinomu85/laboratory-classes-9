const express = require("express");
const router = express.Router();

const {
  getBooks,
  createBook,
  deleteBook,
} = require("../controllers/bookControllers");

router.get("/", getBooks);
router.post("/", createBook);
router.delete("/:id", deleteBook);

module.exports = router;
