import 'dotenv/config'
import request from 'supertest'
import app from '../app.js'

describe('GET /books', () => {
  it('retourne une liste de livres avec statut 200', async () => {
    const response = await request(app).get('/books')
    expect(response.status).toBe(200)
    expect(response.body).toBeInstanceOf(Array)
  })

  it('retourne des livres avec les bonnes propriétés', async () => {
    const response = await request(app).get('/books')
    expect(response.body[0]).toHaveProperty('title')
    expect(response.body[0]).toHaveProperty('author')
    expect(response.body[0]).toHaveProperty('isbn')
  })
})