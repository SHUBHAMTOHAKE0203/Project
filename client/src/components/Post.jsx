import { useState } from "react";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";

export default function Post({ post, onRefresh }) {
  const [comment, setComment] = useState("");

  const isOwner = auth.currentUser?.uid === post.userId;

  const handleDeletePost = async () => {
    const token = await auth.currentUser.getIdToken();
    await fetch(`http://localhost:4000/api/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    onRefresh();
  };

  const handleAddComment = async () => {
    const token = await auth.currentUser.getIdToken();
    await fetch(`http://localhost:4000/api/posts/${post._id}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: comment }),
    });
    setComment("");
    onRefresh();
  };

  const handleDeleteComment = async (commentId) => {
    const token = await auth.currentUser.getIdToken();
    await fetch(`http://localhost:4000/api/posts/${post._id}/comment/${commentId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    onRefresh();
  };

  return (
    <div className="bg-white shadow-lg border-l-4 border-amber-600 rounded-xl p-6 mb-6 transition-all duration-300">
      <p className="font-semibold text-amber-700 text-lg">{post.username}</p>
      <p className="mt-1 text-gray-800">{post.text}</p>

      {post.image && (
        <img
          src={`http://localhost:4000/${post.image}`}
          alt="Post"
          className="my-3 rounded-lg border border-amber-200"
        />
      )}

      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={handleAddComment}
          className="text-white bg-amber-600 hover:bg-amber-700 px-4 py-1 rounded-md text-sm"
        >
          Comment
        </button>
        <Link
          to="/report-spam"
          className="text-red-600 hover:underline text-sm"
        >
          Report Spam
        </Link>
        {isOwner && (
          <button
            onClick={handleDeletePost}
            className="text-gray-500 hover:text-red-500 text-sm"
          >
            Delete Post
          </button>
        )}
      </div>

      <input
        className="w-full mt-4 p-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <ul className="mt-4 space-y-2 text-sm text-gray-700">
        {post.comments.map((c) => {
          const isCommentOwner = auth.currentUser?.uid === c.userId;
          return (
            <li
              key={c._id || c.text}
              className="flex justify-between items-center bg-amber-50 p-2 rounded-md shadow-sm"
            >
              <span className="text-gray-800">- {c.text}</span>
              {isCommentOwner && (
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Delete
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
