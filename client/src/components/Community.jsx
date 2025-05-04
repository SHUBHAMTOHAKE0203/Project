import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import CreatePost from "./CreatePost";

export default function Community() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:4000/api/posts");
    setPosts(res.data.reverse());
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-amber-600 text-center">Community</h1>
      
      <div className="mb-6">
        <CreatePost onPostCreated={fetchPosts} />
      </div>
      
      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post._id} post={post} onRefresh={fetchPosts} />
        ))}
      </div>
    </div>
  );
}
