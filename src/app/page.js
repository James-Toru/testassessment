"use client";
import { useEffect, useState } from "react";
import { useData } from "./contexts/Datacontexts";
import { getAllPosts } from "./api";
import Link from "next/link";

export default function Home() {
  const { posts, setPosts } = useData();

  useEffect(() => {
    async function fetchData() {
      const data = await getAllPosts();
      setPosts(data);
    }
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-gray-200 text-8xl p-10">Welcome to <span className="text-primary">AnyPost!</span></h1>
        <h2 className="text-gray-200 text-3xl p-7">
        A <span className="text-primary">React/NextJS</span> application that interfaces with the <span className="text-primary"> JSONPlaceholder API</span> to facilitate Create, Read, Update, and Delete &#40;<span className="text-primary">CRUD</span>&#41; operations on posts.
        </h2>
        <Link className="border border-primary bg-primary p-4 mt-5 rounded hover:bg-transparent hover:border hover:border-primary hover:text-primary" href="/create">
          Post Something
        </Link>
      </div>
    </main>
  )
}