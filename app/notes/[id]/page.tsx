import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NoteDetailsClient from "./NoteDetails.client";
import { Note } from "@/types/note";

export default async function NoteDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Prefetch note on the server
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);
  const initialData = queryClient.getQueryData<Note>(["note", id]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NoteDetailsClient id={id} initialData={initialData} />
    </HydrationBoundary>
  );
}









