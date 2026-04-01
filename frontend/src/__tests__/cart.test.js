import { describe, it, expect } from 'vitest'

function addToCart(cartItems, item) {
  const existingItem = cartItems.find((i) => i.id === item.id)

  if (existingItem) {
    return cartItems.map((i) =>
      i.id === item.id
        ? { ...i, quantity: i.quantity + 1 }
        : i
    )
  }

  return [...cartItems, { ...item, quantity: 1 }]
}

describe('addToCart', () => {
  it('ajoute un livre au panier vide', () => {
    const result = addToCart([], { id: 1, title: 'Harry Potter' })
    expect(result).toHaveLength(1)
    expect(result[0].quantity).toBe(1)
  })

  it('augmente la quantité si le livre est déjà dans le panier', () => {
    const cart = [{ id: 1, title: 'Harry Potter', quantity: 1 }]
    const result = addToCart(cart, { id: 1, title: 'Harry Potter' })
    expect(result).toHaveLength(1)
    expect(result[0].quantity).toBe(2)
  })

  it('ajoute un deuxième livre différent', () => {
    const cart = [{ id: 1, title: 'Harry Potter', quantity: 1 }]
    const result = addToCart(cart, { id: 2, title: 'Le Seigneur des Anneaux' })
    expect(result).toHaveLength(2)
  })
})

function removeFromCart(cartItems, id) {
  return cartItems.filter((item) => item.id !== id)
}

describe('removeFromCart', () => {
  it('supprime un livre du panier', () => {
    const cart = [
      { id: 1, title: 'Harry Potter', quantity: 1 },
      { id: 2, title: 'Le Seigneur des Anneaux', quantity: 1 }
    ]
    const result = removeFromCart(cart, 1)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  it('retourne un panier vide si le seul livre est supprimé', () => {
    const cart = [{ id: 1, title: 'Harry Potter', quantity: 1 }]
    const result = removeFromCart(cart, 1)
    expect(result).toHaveLength(0)
  })

  it('ne modifie pas le panier si l id n existe pas', () => {
    const cart = [{ id: 1, title: 'Harry Potter', quantity: 1 }]
    const result = removeFromCart(cart, 99)
    expect(result).toHaveLength(1)
  })
})