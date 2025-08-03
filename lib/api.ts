import axios from "axios";
import type { Note, NewNoteData } from "@/types/note";

const API_URL = "https://notehub-public.goit.study/api";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


if (!TOKEN) {
  throw new Error("Authorization token is missing in environment variables");
}

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
}


export async function fetchNotes({
  search = "",
  tag,
  page = 1,
  perPage = 12,
}: FetchNotesParams = {}): Promise<NotesResponse> {
  try {
    const response = await axios.get<NotesResponse>(`${API_URL}/notes`, {
      params: {
        ...(search ? { search } : {}),
        ...(tag ? { tag } : {}),
        page,
        perPage,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch notes:", error);
    throw error;
  }
}


export async function fetchNoteById(id: number): Promise<Note> {
  try {
    const response = await axios.get<Note>(`${API_URL}/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Failed to fetch note by ID:", error);
    throw error;
  }
}


export async function createNote(data: NewNoteData): Promise<Note> {
  try {
    const response = await axios.post<Note>(`${API_URL}/notes`, data, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Failed to create note:", error);
    throw error;
  }
}

export async function deleteNote(noteId: number): Promise<Note> {
  try {
    const response = await axios.delete<Note>(`${API_URL}/notes/${noteId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Failed to delete note:", error);
    throw error;
  }
}

