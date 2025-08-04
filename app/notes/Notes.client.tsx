"use client";

import css from "./Notes.module.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { fetchNotes, NotesResponse } from "@/lib/api";

import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";
import SearchBox from "@/components/SearchBox/SearchBox";
import Loader from "@/components/Loader/Loader";
import ErrorMessage from "@/components/Error/ErrorMessage";

interface NotesClientProps {
  initialData?: NotesResponse;
}

export default function NotesClient({ initialData }: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const updateSearchQuery = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    updateSearchQuery(value);
  };

  const { data, isSuccess, isLoading, isError } = useQuery<NotesResponse>({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: () => fetchNotes({ page: currentPage, search: searchQuery.trim() || undefined }),
    placeholderData: (prev) => prev,
    initialData: currentPage === 1 && searchQuery === "" ? initialData : undefined,
  });

  const totalPages = data?.totalPages ?? 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchInput} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination page={currentPage} total={totalPages} onChange={setCurrentPage} />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}


