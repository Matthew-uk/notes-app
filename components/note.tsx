import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Modal from "./modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig"; // Adjust the path to your Firebase config
import { toast } from "react-toastify";
import useNotesStore from "@/store/store"; // Adjust the path to your store

interface NoteInterface {
  id: string; // Added id field
  title: string;
  note: string;
  status: string;
  createdAt: any;
}

const Note: React.FC<NoteInterface> = ({
  id,
  title,
  note,
  status,
  createdAt,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { notes, setNotes } = useNotesStore();
  const [loading, setLoading] = useState(false);

  const handleModalOpen = (content: string) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter((note) => note.id !== id)); // Update the state to remove the deleted note
      toast.success("Note deleted successfully!");
    } catch (error: any) {
      toast.error("Failed to delete note: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedTitle: string, updatedNote: string) => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "notes", id), {
        title: updatedTitle,
        note: updatedNote,
      });
      setNotes(
        notes.map((note) =>
          note.id === id
            ? { ...note, title: updatedTitle, note: updatedNote }
            : note
        )
      );
      toast.success("Note updated successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error("Failed to update note: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{title}</TableCell>
      <TableCell>
        <Badge variant="outline">{status}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{createdAt}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              disabled={loading}
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleModalOpen("View")}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleModalOpen("Edit")}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete} disabled={loading}>
              {loading ? "Deleting..." : "Delete"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
      {isModalOpen && (
        <Modal
          title={title}
          note={note}
          modalContent={modalContent}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          loading={loading} // Pass loading state to Modal
        />
      )}
    </TableRow>
  );
};

export default Note;
