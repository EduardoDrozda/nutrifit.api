import { beforeEach, describe, expect, it, vi } from 'vitest'
import { UserController } from './user.controller'
import { IUserService } from '@modules/user/services/user'
import { HttpStatusCode } from '@shared/enum'

describe('UserController', () => {
  let controller: UserController
  const service: IUserService = {
    store: vi.fn(),
    getUserByEmail: vi.fn(),
  }

  const mockResponse: any = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  }

  const mockNext = vi.fn()

  beforeEach(() => {
    vi.resetAllMocks()
    controller = new UserController(service)
  })

  it('should create new user', async () => {
    const user = {
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    }

    vi.spyOn(service, 'store').mockResolvedValueOnce(user)

    const payload = {
      name: user.name,
      email: user.email,
      password: user.password,
    }

    const request: any = {
      body: payload,
    }

    await controller.store(request, mockResponse, mockNext)

    expect(service.store).toHaveBeenCalledWith(payload)
    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusCode.CREATED)
  })

  it('should call next function when an error occurs', async () => {
    const error = new Error('any_error')
    vi.spyOn(service, 'store').mockRejectedValueOnce(error)
    const request: any = {
      body: {},
    }
    await controller.store(request, mockResponse, mockNext)
    expect(mockNext).toHaveBeenCalledWith(error)
  })
})
