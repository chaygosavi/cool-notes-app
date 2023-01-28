import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from "../models/note";
import * as NotesApi from "../service/notesService";
import styles from "../styles/notesPage.module.css";
import AddNoteDailog from "./AddNoteDailog";
import Note from "./Note";
import styleUtils from "../styles/utils.module.css";

const NotesPageLoggedInView = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  useEffect(() => {
    (async function () {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    })();
  }, []);

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  const notesGrid = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
      {notes?.map((note) => (
        <Col key={note._id}>
          <Note
            note={note}
            onDeleteNoteClicked={deleteNote}
            onNoteClicked={setNoteToEdit}
            className={styles.note}
          />
        </Col>
      ))}
    </Row>
  );
  return (
    <>
      <Button
        className={`mb-4 ${styleUtils.blockCenter} ${styleUtils.flexCenter}`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <FaPlus />
        Add new note
      </Button>
      {notesLoading ? <Spinner animation="border" variant="primary" /> : <></>}
      {showNotesLoadingError ? (
        <p>Something went wrong. Please refresh the page.</p>
      ) : (
        <></>
      )}
      {!notesLoading && !showNotesLoadingError ? (
        <>{notes.length > 0 ? notesGrid : <p>You don't have any notes</p>}</>
      ) : (
        <></>
      )}
      {showAddNoteDialog ? (
        <AddNoteDailog
          onNoteSaved={(newNote) => {
            setShowAddNoteDialog(false);
            setNotes([...notes, newNote]);
          }}
          onDismiss={() => setShowAddNoteDialog(false)}
        />
      ) : (
        <></>
      )}
      {noteToEdit ? (
        <AddNoteDailog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default NotesPageLoggedInView;
