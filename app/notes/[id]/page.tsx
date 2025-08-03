import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
  params: {
    id: string;
  };
}

export default function NoteDetailsPage({ params }: PageProps) {
  const noteId = Number(params.id);

  if (isNaN(noteId)) {
    return <p>Invalid note ID</p>;
  }

  return <NoteDetailsClient id={noteId} />;
}

