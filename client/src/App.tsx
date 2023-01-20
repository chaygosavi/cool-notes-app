import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/notesPage.module.css";
import * as NotesApi from "./service/notesService";
import AddNoteDailog from "./components/AddNoteDailog";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    (async function () {
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    })();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteDialog(true)}>Add new note</Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes?.map((note) => (
          <Col key={note._id}>
            <Note note={note} className={styles.note} />
          </Col>
        ))}
      </Row>
      {showAddNoteDialog ? (
        <AddNoteDailog onDismiss={() => setShowAddNoteDialog(false)} />
      ) : (
        <></>
      )}
    </Container>
  );
}

export default App;
