import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface ModalProps {
  title: string;
  note: string;
  modalContent: string;
  onClose: () => void;
  onSave: (updatedTitle: string, updatedNote: string) => void;
  loading: boolean; // New prop
}

const Modal: React.FC<ModalProps> = ({
  modalContent,
  title,
  note,
  onClose,
  onSave,
  loading,
}) => {
  const [formState, setFormState] = useState({
    title: title,
    note: note,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSave = () => {
    onSave(formState.title, formState.note);
  };

  const renderModalContent = () => {
    switch (modalContent) {
      case "Edit":
        return (
          <div className="space-y-8">
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Note</DialogTitle>
              </DialogHeader>
              <form>
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    name="title"
                    value={formState.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="note">Note</label>
                  <Input
                    id="note"
                    name="note"
                    value={formState.note}
                    onChange={handleInputChange}
                  />
                </div>
              </form>
              <DialogFooter>
                <Button
                  variant="default"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button variant="ghost" onClick={onClose} disabled={loading}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </div>
        );
      case "View":
        return (
          <div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <DialogDescription>{note}</DialogDescription>
              <DialogFooter>
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      {renderModalContent()}
    </Dialog>
  );
};

export default Modal;
