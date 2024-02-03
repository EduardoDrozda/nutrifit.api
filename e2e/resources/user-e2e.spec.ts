import { beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Application } from 'src/app'

describe('User E2E', () => {
  const app: Application = new Application()

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/api/users').send({
      name: 'User Example',
      email: 'mock@email.com',
      password: 'secret',
      passwordConfirmation: 'secret',
    })

    console.log(response.body)
    expect(response.statusCode).toBe(201)
  })
})
