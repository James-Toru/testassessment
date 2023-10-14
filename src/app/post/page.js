"use client";
import { useEffect, useState } from "react";
import { getAllPosts } from "../api";
import Link from "next/link";

export default function Post() {
        const [posts, setPosts] = useState([]);

        useEffect(() => {
            async function fetchData() {
            const data = await getAllPosts();
            setPosts(data);
            }
            fetchData();
        }, []);

        if (!posts) return <div className="flex justify-center items-center text-primary"><h1>Loading...</h1></div>;

    return (
        <main>
            <div className="p-4">
                <div className="mb-4">
                    <h1 className="text-2xl">All Posts</h1>
                </div>
            {posts.map(post => (
                <div key={post.id} className="border p-4 mb-2 rounded hover:border-primary">
                    <h2 className="text-xl mb-2">{post.title}</h2>
                    <p className="p-2">{post.body.slice(0,200)} ...</p>
                    <Link className="text-primary hover:text-gray-200 p-2" href={`/post/${post.id}`}>
                        View
                    </Link>
                </div>
            ))}
            </div>
        </main>
    )
  }