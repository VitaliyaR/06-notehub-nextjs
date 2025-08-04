import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNotes, NotesResponse } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();


  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1],
    queryFn: () => fetchNotes({ page: 1 }),
  });

  const dehydratedState = dehydrate(queryClient);
  const initialData = queryClient.getQueryData<NotesResponse>(["notes", "", 1]);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient initialData={initialData} />
    </HydrationBoundary>
  );
}

