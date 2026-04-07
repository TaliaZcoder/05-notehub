import axios from "axios";
import type { Note } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const fetchNotes = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};

export const createNote = async (
  note: CreateNoteRequest
): Promise<Note> => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};