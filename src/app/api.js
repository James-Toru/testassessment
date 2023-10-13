// api.js
const API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function getAllPosts() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function getPostById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export async function createPost(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function updatePost(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deletePost(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
