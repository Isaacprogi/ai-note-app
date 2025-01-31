import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNote } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import { generateSummary } from "../../api/ai";
import { BsMic, BsMicMute } from "react-icons/bs";

export default function NoteForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (!title || !content) return;

    const summary = await generateSummary(content);
    const newNote = { id: uuidv4(), title, content, summary };

    dispatch(addNote(newNote));
    setTitle("");
    setContent("");
  };

  const startRecording = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setContent((prev) => prev + " " + transcript);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col  w-full h-screen bg-gray-900 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Notes Assistant</h2>

      {/* Notes Input Section */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col space-y-3">
        <input
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded outline-none"
        />

        <textarea
          placeholder="Write or speak your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="bg-gray-700 text-white p-2 rounded h-24 resize-none outline-none"
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Save Note
          </button>

          <button
            onClick={startRecording}
            className={`p-2 rounded-full ${
              isRecording ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {isRecording ? <BsMicMute size={20} /> : <BsMic size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
