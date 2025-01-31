import { createSlice, PayloadAction, configureStore } from "@reduxjs/toolkit";

type Note = {
  id: string;
  title: string;
  content: string;
  summary?: string;
};

interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: JSON.parse(localStorage.getItem("ainote:notes") || "[]"),
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
    //   localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    //   localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
    //   localStorage.setItem("notes", JSON.stringify(state.notes));
    },
  },
});

export const { addNote, deleteNote, updateNote } = notesSlice.actions;

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
