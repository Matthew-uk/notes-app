"use client";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashNav from "@/components/ui/dashnav";
import NotesTable from "@/components/table";
import TabsControl from "@/components/tabsControl";
import AddNote from "@/components/addNotes";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
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
import TabsSection from "@/components/TabsSection";
import SpinnerComponent from "@/components/spinner";

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
          setLoading(true);
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
          console.log(notes);
        } catch (error: any) {
          console.error({ error });
          setError("Failed to fetch notes. " + error.message);
        } finally {
          setLoading(false);
          console.log(notes);
        }
      }
    };
    fetchNotes();
  }, [user]);

  if (!user) return <div>Please log in to see your notes.</div>;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {loading ? <SpinnerComponent loading={loading} /> : <TabsSection />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
