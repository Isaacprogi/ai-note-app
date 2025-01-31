import { useSelector, useDispatch } from "react-redux";
import { RootState, deleteNote } from "../../store/store";
import { BsThreeDots } from "react-icons/bs";
import { useState } from "react";
import { Dialog, DialogPanel,DialogTitle } from "@headlessui/react";

export default function NoteList() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const openModal = (note: any) => {
    setSelectedNote(note);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="w-64 flex flex-col border-r border-gray-100  bg-gray-900 text-white h-screen p-4">
      <h1 className="text-xl font-bold mb-4">AI-Powered Notes 📝</h1>
      <h2 className="text-xl font-semibold mb-4">Notes</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500">No notes added yet.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex justify-between items-center p-2 rounded hover:bg-gray-800 transition relative"
            >
              <span className="truncate">{note.title}</span>
              <button onClick={() => setMenuOpen(menuOpen === note.id ? null : note.id)}>
                <BsThreeDots className="text-gray-400 hover:text-white" />
              </button>
              {menuOpen === note.id && (
                <div className="absolute right-0 mt-2 w-32 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                  <button
                    onClick={() => openModal(note)}
                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 w-full text-left"
                  >
                    View
                  </button>
                  <button
                    onClick={() => dispatch(deleteNote(note.id))}
                    className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700 w-full text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      {/* Modal for Viewing Note Details */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <DialogPanel className="bg-white text-black rounded-lg p-6 w-96 shadow-xl">
            <DialogTitle className="text-xl font-bold">{selectedNote?.title}</DialogTitle>
            <p className="mt-2">{selectedNote?.content}</p>
            {selectedNote?.summary && (
              <p className="mt-2 text-sm text-gray-600">Summary: {selectedNote.summary}</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}
