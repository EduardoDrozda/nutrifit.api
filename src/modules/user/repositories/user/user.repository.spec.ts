import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { IUserRepository } from './iUser.repository'
import { UserRepository } from './user.repository'

const prismaRepository = {
  connect: vi.fn(),
  disconnect: vi.fn(),
  user: {
    create: vi.fn(),
    findFirst: vi.fn(),
  },
}

vi.mock('@shared/database/prisma', () => ({
  PrismaRepository: vi.fn().mockImplementation(() => prismaRepository),
}))

describe('UserRepository', () => {
  let sut: IUserRepository

  beforeEach(() => {
    sut = new UserRepository()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  it('should create a user', async () => {
    const data = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    }

    vi.spyOn(prismaRepository.user, 'create').mockResolvedValueOnce(data)

    const payload = {
      name: data.name,
      email: data.email,
      password: data.password,
    }

    await sut.store(payload)

    expect(prismaRepository.user.create).toHaveBeenCalledTimes(1)
    expect(prismaRepository.user.create).toHaveBeenCalledWith({ data: payload })
  })

  it('should get a user by email', async () => {
    const data = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    }

    vi.spyOn(prismaRepository.user, 'findFirst').mockResolvedValueOnce(data)

    await sut.getUserByEmail(data.email)

    expect(prismaRepository.user.findFirst).toHaveBeenCalledTimes(1)
    expect(prismaRepository.user.findFirst).toHaveBeenCalledWith({
      where: {
        email: {
          equals: data.email,
          mode: 'insensitive',
        },
      },
    })
  })
})
