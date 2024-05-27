import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import useNotesStore from "@/store/store";
import { toast } from "react-toastify";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Add a title to form",
  }),
  note: z.string().min(1, {
    message: "Notes cannot be empty",
  }),
});

interface Note {
  id: string;
  title: string;
  text: string;
  userId: string;
  createdAt: Date;
}

interface NoteFormProps {
  onSuccess: () => void; // New prop for success callback
}

const NoteForm: React.FC<NoteFormProps> = ({ onSuccess }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      note: "",
    },
  });

  const { user } = useAuth(); // Get the current user
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { notes, setNotes } = useNotesStore();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const note: Omit<Note, "id"> = {
        title: data.title,
        text: data.note,
        userId: user!.uid,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "notes"), note);
      setNotes([...notes, { ...note, id: docRef.id }]);
      form.reset();
      onSuccess();
      toast.success("Note added successfully!");
    } catch (error: any) {
      setError("Failed to add note. " + error.message);
      toast.error("Failed to add note. " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter note" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <div className="text-red-500">{error}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add New Note"}
        </Button>
      </form>
    </Form>
  );
};

export default NoteForm;
