import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const noteId = Number(id);

  if (isNaN(noteId)) {
    return <p>Invalid note ID</p>;
  }

  return <NoteDetailsClient id={noteId} />;
}
