import { describe, it, expect } from 'vitest'

function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

describe('isTokenExpired', () => {
  it('retourne true si le token est expiré', () => {
    // Token avec une date d'expiration dans le passé
    const expiredToken = 'header.' + btoa(JSON.stringify({ exp: 1 })) + '.signature'
    expect(isTokenExpired(expiredToken)).toBe(true)
  })

  it('retourne false si le token est valide', () => {
    // Token avec une date d'expiration dans le futur
    const validToken = 'header.' + btoa(JSON.stringify({ exp: 9999999999 })) + '.signature'
    expect(isTokenExpired(validToken)).toBe(false)
  })

  it('retourne true si le token est invalide', () => {
    expect(isTokenExpired('token_invalide')).toBe(true)
  })
})