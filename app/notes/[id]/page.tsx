import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "@/types/note";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const queryClient = new QueryClient();

  
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








