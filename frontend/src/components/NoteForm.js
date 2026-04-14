import React, { useState, useEffect } from "react";
import axios from "axios";

function NoteForm({ editNote, setEditNote }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");

    useEffect(() => {
        if (editNote) {
            setTitle(editNote.title);
            setContent(editNote.content);
            setTags(editNote.tags.join(","));
        }
    }, [editNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tagArray = tags.split(",").map(tag => tag.trim());

        try {
            if (editNote) {
                await axios.put(
                    `http://localhost:5000/api/notes/${editNote._id}`,
                    { title, content, tags: tagArray }
                );
                setEditNote(null);
            } else {
                await axios.post("http://localhost:5000/api/notes", {
                    title,
                    content,
                    tags: tagArray
                });
            }

            setTitle("");
            setContent("");
            setTags("");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={styles.card}>
            <h2>{editNote ? "Edit Note" : "Add Note"}</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                />

                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={styles.textarea}
                />

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    style={styles.input}
                />

                <button type="submit" style={styles.button}>
                    {editNote ? "Update" : "Add"}
                </button>
            </form>
        </div>
    );
}

const styles = {
  card: {
    background: "#fafafa",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "20px"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default NoteForm;