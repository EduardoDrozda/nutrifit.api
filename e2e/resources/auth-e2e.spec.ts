import { UserRepository } from '@modules/user/repositories/user'
import { UserService } from '@modules/user/services/user'
import { PrismaRepository } from '@shared/database'
import { Application } from 'src/app'
import { afterEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { HttpStatusCode } from '@shared/enum'

describe('Auth E2E', () => {
  const app: Application = new Application()
  const prisma = new PrismaRepository()
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository)

  afterEach(async () => {
    await prisma.user.deleteMany()
  })

  it('should be able to authenticate with valid credentials', async () => {
    const mockUser: any = {
      name: 'User Example',
      email: 'mock@email.com',
      password: 'secret',
    }

    const user = await userService.store(mockUser)

    await request(app.server)
      .post('/api/auth')
      .send({
        email: mockUser.email,
        password: mockUser.password,
      })
      .expect(HttpStatusCode.OK)
      .then((response) => {
        const data = response.body
        expect(data).toHaveProperty('user')
        expect(data.user.id).toBe(user.id)
        expect(data.user.name).toBe(user.name)
        expect(data.user.email).toBe(user.email)
        expect(data).toHaveProperty('token')
        expect(data.token).toHaveProperty('type')
        expect(data.token).toHaveProperty('access_token')
      })
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    await request(app.server)
      .post('/api/auth')
      .send({
        email: 'email@email.com',
        password: '1234343',
      })
      .expect(HttpStatusCode.UNAUTHORIZED)
  })
})
