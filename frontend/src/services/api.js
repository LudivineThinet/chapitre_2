const API_URL = "http://localhost:3000";

export async function fetchBookById(id) {
  const response = await fetch(`${API_URL}/books/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch book");
  }

  return response.json();
}

export async function fetchBookOffers(id) {
  const response = await fetch(`${API_URL}/books/${id}/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch offers");
  }

  return response.json();
}

export async function fetchBooks() {
  const response = await fetch(`${API_URL}/books`);

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }

  return response.json();
}
