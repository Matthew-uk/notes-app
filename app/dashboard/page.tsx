"use client";
import { useState, useEffect, FormEvent } from "react";
import { useAuth } from "@/context/authContext";
import { auth, db } from "@/firebaseConfig";
import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  doc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

interface Note {
  id: string;
  text: string;
  userId: string;
  createdAt: Date;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      if (user) {
        try {
          const q = query(
            collection(db, "notes"),
            where("userId", "==", user.uid)
          );
          const querySnapshot = await getDocs(q);
          setNotes(
            querySnapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as Note)
            )
          );
        } catch (error: any) {
          console.error({ error });
          setError("Failed to fetch notes. " + error.message);
        }
      }
    };
    fetchNotes();
  }, [user]);

  const addNote = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    if (newNote.trim() === "") return;
    setError("");

    try {
      const note: Omit<Note, "id"> = {
        text: newNote,
        userId: user!.uid,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "notes"), note);
      setNotes([...notes, { ...note, id: docRef.id }]);
      setNewNote("");
    } catch (error: any) {
      setError("Failed to add note. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (id: string) => {
    setError("");

    try {
      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error: any) {
      setError("Failed to delete note. " + error.message);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) return <div>Please log in to see your notes.</div>;

  return (
    <div className="container mx-auto p-4">
      <button onClick={signOutUser}>Logout</button>
      <h1 className="text-2xl mb-4">Your Notes</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={addNote} className="mb-4">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="New Note"
          required
          className="border p-2 w-full mb-2"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            loading && "opacity-75"
          } transition-all ease-in-out duration-300`}
        >
          {loading ? "Loading..." : "Add Note"}
        </button>
      </form>
      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-gray-100 p-4 rounded shadow"
          >
            {note.text}
            <button
              onClick={() => deleteNote(note.id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
