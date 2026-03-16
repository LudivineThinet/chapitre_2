const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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


// Créer une demande de rachat
export async function createBuyback(isbn, condition) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/buybacks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      isbn,
      condition,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur rachat");
  }

  return response.json();
}

// Estimer un rachat (sans création)
export async function estimateBuyback(isbn, condition) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/buybacks/estimate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      isbn,
      condition,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erreur estimation");
  }

  return response.json();
}



//post Refacto 

// ================= ADMIN BOOKS =================

// Récupérer tous les livres (admin)
export async function fetchAdminBooks() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/books`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur chargement livres");
  }

  return data;
}

// Récupérer les genres
export async function fetchGenres() {
  const response = await fetch(`${API_URL}/genres`);
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Erreur chargement genres");
  return data;
}

// Ajouter un livre
export async function createAdminBook(bookData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/books`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// Modifier un livre
export async function updateAdminBook(id, bookData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// ================= ADMIN BUYBACKS =================

// Récupérer toutes les demandes de rachat (admin)
export async function fetchAdminBuybacks() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/buybacks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur chargement");
  }

  return data;
}

// Valider ou refuser une demande
export async function updateAdminBuybackStatus(id, status) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/buybacks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Erreur mise à jour");
  }

  return response.json();
}

// ================= ADMIN ORDERS =================

// Récupérer toutes les commandes (admin)
export async function fetchAdminOrders() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur chargement commandes");
  }

  return data;
}

// Mettre à jour le status d'une commande
export async function updateAdminOrderStatus(orderId, status) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/admin/orders/${orderId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Erreur mise à jour statut");
  }

  return response.json();
}

// ================= ADMIN STOCK =================

// Récupérer le stock
export async function fetchAdminStock() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/book-items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur chargement stock");
  }

  return data;
}


// Modifier le stock d'un item
export async function updateAdminStockItem(id, stock) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/book-items/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ stock }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Erreur mise à jour stock");
  }

  return response.json();
}

// Ajouter un exemplaire
export async function createAdminStockItem(itemData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/admin/book-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur ajout exemplaire");
  }

  return data;
}

// ================= USER PROFILE =================

// Récupérer le profil utilisateur
export async function fetchUserProfile() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur chargement profil");
  }

  return data;
}

// Mettre à jour le profil utilisateur
export async function updateUserProfile(formData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur mise à jour profil");
  }

  return data;
}

// ================= USER ADDRESSES =================

// récupérer les adresses utilisateur
export async function fetchUserAddresses() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/addresses/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur chargement adresses");
  }

  return data;
}

// créer une adresse
export async function createUserAddress(addressData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur création adresse");
  }

  return data;
}

// supprimer une adresse
export async function deleteUserAddress(addressId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/addresses/${addressId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Erreur suppression adresse");
  }

  return true;
}

// ================= USER BUYBACKS =================

// récupérer les ventes de l'utilisateur
export async function fetchUserBuybacks() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/buybacks/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur chargement ventes");
  }

  return data;
}

// ================= USER ORDERS =================

// récupérer les commandes de l'utilisateur
export async function fetchUserOrders() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur chargement commandes");
  }

  return data;
}

// ================= USER PAYOUT =================

// récupérer les infos de paiement
export async function fetchUserPayout() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/payout-infos/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur chargement payout");
  }

  return data;
}

// mettre à jour les infos de paiement
export async function updateUserPayout(payoutData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/payout-infos/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payoutData),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur mise à jour payout");
  }

  return data;
}

// ================= USER ACCOUNT =================

// supprimer le compte utilisateur
export async function deleteUserAccount() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/users/me`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Erreur suppression compte");
  }

  return true;
}
// ================= PAYMENTS =================

// créer une session Stripe Checkout
export async function createCheckoutSession(items) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/payments/create-checkout-session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur création session paiement");
  }

  return data;
}

// ================= ORDERS =================

// créer une commande
export async function createOrder(items, addressId) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items,
      address_id: addressId,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Erreur création commande");
  }

  return data;
}