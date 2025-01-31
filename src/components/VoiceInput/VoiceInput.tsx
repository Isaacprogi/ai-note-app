import { useState } from "react";

export default function VoiceInput({ onTranscribe }: { onTranscribe: (text: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event:any) => {
      const transcript = event.results[0][0].transcript;
      onTranscribe(transcript);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startRecording}
      className={`px-4 py-2 rounded ${isRecording ? "bg-gray-400" : "bg-green-500 text-white"}`}
    >
      {isRecording ? "Listening..." : "Start Voice Note"}
    </button>
  );
}
