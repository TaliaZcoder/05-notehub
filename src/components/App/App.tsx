import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";


import css from "./App.module.css";

import type { Note } from "../../types/note";

import {
  fetchNotes,
  createNote,
  deleteNote,
} from "../../services/noteService";

import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import NoteForm from "../NoteForm/NoteForm";

export default function App() {
  const queryClient = useQueryClient();


const [page, setPage] = useState(1);
const [search, setSearch] = useState("");
const [isModalOpen, setIsModalOpen] = useState(false);

const debouncedSearch = useDebouncedCallback((value: string) => {
  setSearch(value);
  setPage(1);
}, 500);

const { data, isLoading, isError } = useQuery({
  queryKey: ["notes", page, search],
  queryFn: () => fetchNotes(page, search),
});

const notes = data?.notes ?? [];
const totalPages = data?.totalPages ?? 0;

const queryClient = useQueryClient();

const deleteMutation = useMutation({
  mutationFn: deleteNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
});
  
const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

const createMutation = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["notes"] });
    setIsModalOpen(false);
  },
});

const handleCreate = (note: Omit<Note, "id">) => {
    createMutation.mutate(note);
};
  
return (
    <div className={css.app}>
      <header className={css.toolbar}>
     
        <SearchBox onChange={debouncedSearch} />

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onChange={setPage}
          />
        )}

        <button
          className={css.button}
          onClick={() => setIsModalOpen(true)}
        >
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Error loading notes</p>}

      {notes.length > 0 && (
        <NoteList notes={notes} onDelete={handleDelete} />
      )}

      {!isLoading && notes.length === 0 && <p>No notes found</p>}
    
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSubmit={handleCreate}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}