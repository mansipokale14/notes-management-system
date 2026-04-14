const express = require("express");
const router = express.Router();

const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
  searchNotes
} = require("../controllers/noteController");

// Create Note
router.post("/", createNote);

// Get All Notes
router.get("/", getNotes);

// Search Notes
router.get("/search", searchNotes);

// Get Single Note
router.get("/:id", getNote);

// Update Note
router.put("/:id", updateNote);

// Delete Note
router.delete("/:id", deleteNote);

module.exports = router;