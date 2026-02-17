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


// Inscription utilisateur
export async function registerUser(email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur inscription");
  }

  return response.json();
}


// Connexion utilisateur
export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur connexion");
  }

  return response.json();
}

// Récupérer le token JWT stocké
export function getToken() {
  return localStorage.getItem("token");
}
