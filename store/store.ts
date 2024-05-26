import { create } from "zustand";
interface Note {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}
interface NotesAppProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | null) => void;
  notes: Note[];
}

const useNotesStore = create<NotesAppProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: any) => set({ isOpen }),
  notes: [],
  setNotes: (note: Note) => set((state) => ({ notes: [...state.notes, note] })),
}));

export default useNotesStore;
