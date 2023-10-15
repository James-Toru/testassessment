"use client";
import { useState } from "react";
import { useData } from "../contexts/Datacontexts";
import { getAllPosts, createPost } from "../api";
import Link from "next/link";

//Components
import AppNotification from "../components/AppNotification";
import Form from "./Form";


function CreatePost() {
  const { posts, setPosts } = useData();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [notification, setNotification] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const showNotification = (message) => {
    setNotification(message);
  };

  const validateForm = () => {
    let errors = {};
    if (!title.trim()) errors.title = "Title is required.";
    if (!body.trim()) errors.body = "Body is required.";
    setFormErrors(errors);
    // If no errors, return true
    return Object.keys(errors).length === 0;
    };

  const handleCreatePost = async () => {
    if (!validateForm()) return;
    const newPost = await createPost({ title, body });
    // Assign a new unique ID to the post
    const maxCurrentId = Math.max(...posts.map(p => p.id));
    newPost.id = maxCurrentId + 1;
    setPosts([...posts, newPost]);
    setTitle('');
    setBody('');
    showNotification('Post created successfully!');
  };

  console.log(posts)

  return (
    <main>
    <div className="p-4">
    {notification && (
        <AppNotification message={notification} onClose={() => setNotification(null)} />
      )}
      <div className="mb-4">
        <h2>Create A Post</h2>
      </div>
      <Form title={title} body={body} onTitleChange={(e) => setTitle(e.target.value)} onBodyChange={(e) => setBody(e.target.value)} onClick={handleCreatePost}/>
      {formErrors.title && <p className="text-red-500 text-sm font-bold">{formErrors.title}</p>}
      {formErrors.body && <p className="text-red-500 text-sm font-bold">{formErrors.body}</p>}
      <div className="mb-4">
        <h2>Latest Posts</h2>
      </div>
      {posts.slice(-5).reverse().map(post => (
        <div key={post.id} className="border p-4 mb-2 rounded hover:border-primary">
          <h2 className="text-xl mb-2">{post.title}</h2>
          <p className="p-2">{post.body.slice(0,200)} ...</p>
          <Link className="p-2 text-primary hover:text-gray-200" href={`/post/${post.id}`} state={{ post }}>
            View
        </Link>
        </div>
      ))}
    </div>
    </main>
  );
}

export default CreatePost;
