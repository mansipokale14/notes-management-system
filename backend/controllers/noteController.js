const Note = require("../models/Note");

// Create Note
exports.createNote = async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get All Notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ updatedAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Single Note
exports.getNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Update Note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );

    res.json(note);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Delete Note
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};

// Search Notes
exports.searchNotes = async (req, res) => {
  try {
    const query = req.query.q;

    const notes = await Note.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    });

    res.json(notes);
  } catch (error) {
    res.status(500).json(error);
  }
};