"use client";
import { useEffect, useState } from "react";
import { getAllPosts, createPost } from "./api";
import Link from "next/link";


function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

  const handleCreatePost = async () => {
    const newPost = await createPost({ title, body });
    setPosts([...posts, newPost]);
    setTitle('');
    setBody('');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2>Create A Post</h2>
      </div>
      <div className="mb-4 flex flex-col">
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          className="p-2 border rounded text-black"
        />
        <textarea 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
          placeholder="Body" 
          className="p-2 border rounded mt-2 text-black"
        />
        <button onClick={handleCreatePost} className="p-2 bg-blue-500 text-white mt-2 rounded">Create Post</button>
      </div>

      {posts.map(post => (
        <div key={post.id} className="border p-4 mb-2 rounded">
          <h2 className="text-xl mb-2">{post.title}</h2>
          <p className="p-2">{post.body}</p>
          <Link href={`/post/${post.id}`}>
            View
        </Link>
        </div>
      ))}
    </div>
  );
}

export default Home;
