"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { getPostById, updatePost, deletePost } from "@/app/api";

function extractIdFromPathname(pathname) {
    const parts = pathname.split('/');
    return parts[parts.length - 1];
}

function Post() {
    const [id, setId] = useState(null);
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const postId = extractIdFromPathname(window.location.pathname);
            setId(postId);

            async function fetchData() {
                const data = await getPostById(postId);
                setPost(data);
                setTitle(data.title);
                setBody(data.body);
            }
            fetchData();
        }
    }, []);


    const handleUpdatePost = async () => {
        const updatedPost = await updatePost(id, { title, body });
        setPost(updatedPost);
        setEditing(false);
    };

    const handleDeletePost = async () => {
        await deletePost(id);
        router.push('/'); // Redirect to home after delete
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="p-4">
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
                        className="p-2 text-black border rounded mt-2"
                    />
                    <button onClick={handleUpdatePost} className="p-2 bg-green-500 text-white mt-2 mr-2 rounded">Save</button>
                    <button onClick={() => setEditing(false)} className="p-2 bg-red-500 text-white mt-2 rounded">Cancel</button>
                </div>
            ) : (
                <>
                    <h2 className="text-2xl mb-4">{post.title}</h2>
                    <p className="mb-4">{post.body}</p>
                    <button onClick={() => setEditing(true)} className="p-2 bg-yellow-400 text-white rounded mr-2">Edit</button>
                    <button onClick={handleDeletePost} className="p-2 bg-red-500 text-white rounded">Delete</button>
                </>
            )}
        </div>
    );
}

export default Post;
