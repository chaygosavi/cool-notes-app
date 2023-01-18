import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const loadNotes = async () => {
      const response = await fetch("/api/notes", { method: "GET" });
      const notes = await response.json();
      setNotes(notes);
    };
    loadNotes();
  }, []);

  return (
    <div>
      {notes?.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </div>
  );
}

export default App;
