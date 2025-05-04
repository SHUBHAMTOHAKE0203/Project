import { useState } from "react";
import axios from "axios";
import { auth } from "../../firebase";

export default function CreatePost({ onPostCreated }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const token = await auth.currentUser.getIdToken();
    const formData = new FormData();
    formData.append("text", text);
    if (image) formData.append("image", image);

    await axios.post("http://localhost:4000/api/posts", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setText("");
    setImage(null);
    onPostCreated();
  };

  return (
    <div className="bg-white shadow-md p-4 rounded-md mb-4">
      <textarea
        className="w-full border border-amber-600 rounded p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-amber-600"
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mb-3 text-amber-600"
      />
      <button
        onClick={handleSubmit}
        className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded transition-colors duration-200"
      >
        Post
      </button>
    </div>
  );
}
