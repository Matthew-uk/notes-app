"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TabsContent } from "./ui/tabs";
import Note from "./note";
import useNotesStore from "@/store/store";

const convertFirestoreTimestampToDate = (timestamp: any) => {
  if (timestamp.seconds && timestamp.nanoseconds) {
    return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
  }
  return new Date(timestamp); // fallback in case it's already a Date object
};

const NotesTable = () => {
  const { notes } = useNotesStore();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes &&
          notes.map((note) => (
            <Note
              id={note.id}
              title={note.title}
              key={note.id}
              note={note.text}
              status="Incomplete"
              createdAt={convertFirestoreTimestampToDate(
                note.createdAt
              ).toLocaleString()}
            />
          ))}
      </TableBody>
    </Table>
  );
};

export default NotesTable;
