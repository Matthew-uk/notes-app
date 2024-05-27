import { create } from "zustand";

interface Note {
  id: string;
  text: string;
  title: string;
  userId: string;
  createdAt: Date;
}

interface NotesAppProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  notes: Note[];
  setNotes: (notes: Note[] | any) => void;
}

const useNotesStore = create<NotesAppProps>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  notes: [],
  setNotes: (notes: Note[]) => set((state) => ({ notes })),
}));

export default useNotesStore;
