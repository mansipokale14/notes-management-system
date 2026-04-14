import React, { useEffect, useState } from "react";
import axios from "axios";

function NoteList({ setEditNote, search }) {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      let url = "http://localhost:5000/api/notes";

      if (search) {
        url = `http://localhost:5000/api/notes/search?q=${search}`;
      }

      const res = await axios.get(url);

      // Sort pinned notes first
      const sortedNotes = res.data.sort((a, b) => b.pinned - a.pinned);

      setNotes(sortedNotes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  // DELETE
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  // PIN / UNPIN
  const togglePin = async (note) => {
    try {
      await axios.put(`http://localhost:5000/api/notes/${note._id}`, {
        ...note,
        pinned: !note.pinned
      });
      fetchNotes();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>All Notes</h2>

      {notes.map((note) => (
        <div key={note._id} style={styles.note}>
          <h3>
            {note.title} {note.pinned && "📌"}
          </h3>

          <p>{note.content}</p>

          <p>Tags: {note.tags.join(", ")}</p>

          <div style={styles.buttonGroup}>
            <button
              onClick={() => setEditNote(note)}
              style={styles.edit}
            >
              Edit
            </button>

            <button
              onClick={() => deleteNote(note._id)}
              style={styles.delete}
            >
              Delete
            </button>

            <button
              onClick={() => togglePin(note)}
              style={styles.pin}
            >
              {note.pinned ? "Unpin" : "Pin"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// SIMPLE CLEAN STYLES (BEGINNER LEVEL)
const styles = {
  note: {
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px"
  },

  buttonGroup: {
    marginTop: "10px",
    display: "flex",
    gap: "10px"
  },

  edit: {
    padding: "5px 10px",
    background: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  delete: {
    padding: "5px 10px",
    background: "#f44336",
    color: "white",
    border: "none",
    cursor: "pointer"
  },

  pin: {
    padding: "5px 10px",
    background: "#2196F3",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default NoteList;