import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { type IUserRepository } from './iUser.repository'
import { UserRepository } from './user.repository'

vi.mock('@shared/database/prisma', () => ({
  PrismaRepository: vi.fn().mockImplementation(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
    user: {
      create: vi.fn(),
      findFirst: vi.fn()
    }
  }))
}))

describe.only('UserRepository', () => {
  let userRepository: IUserRepository

  beforeEach(() => {
    userRepository = new UserRepository()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should be defined', () => {
    expect(userRepository).toBeDefined()
  })
})
