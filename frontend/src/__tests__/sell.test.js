import { describe, it, expect } from 'vitest'

function calculateTotal(items) {
  return items.reduce((sum, item) => {
    return sum + Number(item.buy_price)
  }, 0)
}

describe('calculateTotal', () => {
  it('calcule le total de plusieurs livres', () => {
    const items = [
      { buy_price: '5.00' },
      { buy_price: '3.50' },
      { buy_price: '2.00' }
    ]
    expect(calculateTotal(items)).toBe(10.50)
  })

  it('retourne 0 si la liste est vide', () => {
    expect(calculateTotal([])).toBe(0)
  })

  it('fonctionne avec un seul livre', () => {
    const items = [{ buy_price: '4.20' }]
    expect(calculateTotal(items)).toBe(4.20)
  })
})