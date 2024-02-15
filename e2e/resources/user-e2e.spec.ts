import { afterEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { Application } from 'src/app'
import { PrismaRepository } from '@shared/database'
import { HttpStatusCode } from '@shared/enum'

describe('User E2E', () => {
  const app: Application = new Application()
  const prisma = new PrismaRepository()

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app.server).post('/api/users').send({
      name: 'User Example',
      email: 'mock@email.com',
      password: 'secret',
      passwordConfirmation: 'secret',
    })

    expect(response.statusCode).toBe(201)
  })

  it('should return bad request when trying to create a user with already exists email', async () => {
    const mockUser = {
      name: 'User Example',
      email: 'mock@email.com',
      password: 'secret',
    }

    await prisma.user.create({
      data: mockUser,
    })

    const response = await request(app.server)
      .post('/api/users')
      .send({
        ...mockUser,
        passwordConfirmation: mockUser.password,
      })

    expect(response.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
    expect(response.body.message).toBe('Email already exists')
  })

  it('should return unprocessed entity when trying to create a user with password confirmation different from password', async () => {
    const mockUser = {
      name: 'User Example',
      email: 'mock@email.com',
      password: 'secret',
      passwordConfirmation: 'different_secret',
    }

    const response = await request(app.server).post('/api/users').send(mockUser)

    expect(response.statusCode).toBe(HttpStatusCode.UNPROCESSABLE_ENTITY)
    expect(response.body.errors).toEqual([
      'Password and password confirmation must be equal',
    ])
  })

  it('should be able to get logged user', async () => {
    const mockUser = {
      name: 'User Example',
      email: 'mock@email.com',
      password: '$2a$10$WpfmWPpMldrC7VQdkV7TGes5PWPs1hXd1bCZJk2W5gdEg3m6udR1y',
    }

    const createdUser = await prisma.user.create({
      data: mockUser,
    })

    const response = await request(app.server).post('/api/auth').send({
      email: mockUser.email,
      password: 'secret',
    })

    const {
      token: { type, accessToken },
    } = response.body

    await request(app.server)
      .get('/api/users/me')
      .set('Authorization', `${type} ${accessToken}`)
      .send()
      .expect(HttpStatusCode.OK)
      .then((response) => {
        const data = response.body
        expect(data).toHaveProperty('id')
        expect(data.id).toBe(createdUser.id)
      })
  })
})
