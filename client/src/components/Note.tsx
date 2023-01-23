import styless from "../styles/notes.module.css";
import { Card } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
  className?: string;
}

const Note = ({
  note,
  onDeleteNoteClicked,
  onNoteClicked,
  className,
}: NoteProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated: " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created: " + formatDate(createdAt);
  }

  return (
    <Card
      onClick={() => onNoteClicked(note)}
      style={{ backgroundColor: "cornsilk" }}
      className={className}
    >
      <Card.Body
        style={{
          overflow: "hidden",
          maskImage: "linear-gradient(180deg,#000,60%,transparent)",
        }}
      >
        <Card.Title className="d-flex justify-content-between align-items-center">
          {title}
          <Card.Text
            onClick={(e: { stopPropagation: () => void }) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          >
            <MdDelete color="gray" />
          </Card.Text>
        </Card.Title>
        <Card.Text style={{ whiteSpace: "pre-line" }}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;
