import NoteDetailsClient from "./NoteDetails.client";

export default function NoteDetailsPage({ params }: { params: { id: string } }) {
  const noteId = Number(params.id);

  if (isNaN(noteId)) {
    return <p>Invalid note ID</p>;
  }

  return <NoteDetailsClient id={noteId} />;
}


