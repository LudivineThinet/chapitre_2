import 'dotenv/config'
import request from 'supertest'
import app from '../app.js'

describe('POST /auth/login', () => {
  it('retourne un token JWT avec des identifiants valides', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'ludivine@test.fr',
        password: '123'
      })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('user')
  })

  it('retourne une erreur 401 avec un mauvais mot de passe', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'ludivine@test.fr',
        password: 'mauvaismdp'
      })
    expect(response.status).toBe(401)
  })

  it('retourne une erreur 400 si email manquant', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        password: '123'
      })
    expect(response.status).toBe(400)
  })
})