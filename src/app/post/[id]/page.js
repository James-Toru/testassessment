"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useData } from "@/app/contexts/Datacontexts";
import { getPostById, updatePost, deletePost } from "@/app/api";

//Components
import AppNotification from "@/app/components/AppNotification";

function Post({ params }) {
    const router = useRouter();
    const id = params.id

    const { posts, setPosts } = useData();
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editing, setEditing] = useState(false);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const foundPost = posts.find(p => p.id == id);
        console.log(foundPost)
        if (foundPost) {
            setPost(foundPost);
            setTitle(foundPost.title);
            setBody(foundPost.body)
        } 
    }, [id, posts]);

    const showNotification = (message) => {
        setNotification(message);
      };

    const handleUpdatePost = async () => {
    // Update the post in the context
        const updatedPost = {
            ...post,
            title,
            body
        };
  
        const updatedPosts = posts.map(p => p.id == id ? updatedPost : p);
        setPosts(updatedPosts);
    // Update local state
        setPost(updatedPost);
        setEditing(false);
        showNotification('Post updated successfully!');
    };

    const handleDeletePost = async () => {
        const filteredPosts = posts.filter(p => p.id != id);
        setPosts(filteredPosts);
        showNotification('Post updated successfully!');
        setTimeout(() => {
            router.push('/create'); // Redirect to create after a 2-second delay
        }, 2000);
    };

    if (!post) return <div className="flex justify-center items-center text-primary"><h1 className="text-center">Loading...</h1></div>;

    return (
        <main>
        <div className="p-4">
            {notification && (
                <AppNotification message={notification} onClose={() => setNotification(null)} />
            )}
            {editing ? (
                <div className="flex flex-col">
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="p-2 text-black border rounded"
                    />
                    <textarea 
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Body"
                        className="p-2 h-full text-black border rounded mt-2"
                    />
                    <button onClick={handleUpdatePost} className="p-2 bg-green-500 text-white mt-2 mr-2 rounded">Save</button>
                    <button onClick={() => setEditing(false)} className="p-2 bg-red-500 text-white mt-2 rounded">Cancel</button>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl mb-4">{post.title}</h2>
                    <p className="mb-4">{post.body}</p>
                    <div className="flex">
                        <button onClick={() => setEditing(true)} className="p-2 bg-primary text-white rounded mr-2">Edit</button>
                        <button onClick={handleDeletePost} className="p-2 bg-red-500 text-white rounded">Delete</button>
                    </div>
                </>
            )}
        </div>
        </main>
    );
}

export default Post;
