import { IUserRepository } from '@modules/user/repositories/user'
import { IUserService } from './iUser.service'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { UserService } from './user.service'
import { hash } from 'bcryptjs'

describe('UserService', () => {
  let suit: IUserService

  const userRepositoryMock: IUserRepository = {
    store: vi.fn(),
    getUserByEmail: vi.fn(),
  }

  beforeEach(() => {
    suit = new UserService(userRepositoryMock)
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  it('should be defined', () => {
    expect(suit).toBeDefined()
  })

  it('should create a new user', async () => {
    const user = {
      name: 'John Doe',
      email: 'email@email.com',
      password: 'secret',
      passwordConfirmation: 'secret',
    }

    vi.spyOn(userRepositoryMock, 'getUserByEmail').mockResolvedValue(null)

    const createdUser = {
      id: 'id',
      name: user.name,
      email: user.email,
      password: await hash(user.password, 8),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.spyOn(userRepositoryMock, 'store').mockResolvedValue(createdUser)

    await suit.store(user)

    expect(userRepositoryMock.store).toHaveBeenCalledTimes(1)

    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(user.email)
  })

  it('should not create a new user if email already exists', async () => {
    const user = {
      id: 'id',
      name: 'John Doe',
      email: 'email@email.com',
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.spyOn(userRepositoryMock, 'getUserByEmail').mockResolvedValue(user)

    expect(
      suit.store({
        name: user.name,
        email: user.email,
        password: user.password,
        passwordConfirmation: user.password,
      }),
    ).rejects.toThrowError('Email already exists')

    expect(userRepositoryMock.store).not.toHaveBeenCalled()
    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(user.email)
  })

  it('should get a user by email', async () => {
    const user = {
      id: 'id',
      name: 'John Doe',
      email: 'email@email.com',
      password: 'secret',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    vi.spyOn(userRepositoryMock, 'getUserByEmail').mockResolvedValue(user)
    await suit.getUserByEmail(user.email)
    expect(userRepositoryMock.getUserByEmail).toHaveBeenCalledWith(user.email)
  })
})
