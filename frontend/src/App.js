import React, { useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import SearchBar from "./components/SearchBar";

function App() {
  const [editNote, setEditNote] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h1 style={styles.heading}> Notes App</h1>

        <SearchBar setSearch={setSearch} />
        <NoteForm editNote={editNote} setEditNote={setEditNote} />
        <NoteList setEditNote={setEditNote} search={search} />
      </div>
    </div>
  );
}

const styles = {
  body: {
    background: "#f4f6f9",
    minHeight: "100vh",
    padding: "20px"
  },
  container: {
    maxWidth: "600px",
    margin: "auto",
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  }
};

export default App;