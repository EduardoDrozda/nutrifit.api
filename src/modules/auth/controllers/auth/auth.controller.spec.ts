import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthController } from './auth.controller'
import { IAuthService } from '@modules/auth/services'
import { IAuthRequestDTO } from '@modules/auth/dtos'

describe('AuthController', () => {
  let authController: AuthController
  const authService: IAuthService = {
    login: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    authController = new AuthController(authService)
  })

  it('should be defined', () => {
    expect(authController).toBeDefined()
  })

  it('should call login with token', async () => {
    const credentials: IAuthRequestDTO = {
      email: 'email@email.com',
      password: 'mock',
    }

    vi.spyOn(authService, 'login').mockResolvedValueOnce({
      user: {
        id: 'd797a77c-5ffa-4e4b-b407-9a15752fff40',
        name: 'Dummy User',
        email: 'email@email.com',
      },
      token: {
        type: 'Bearer',
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ3OTdhNzdjLTVmZmEtNGU0Yi1iNDA3LTlhMTU3NTJmZmY0MCIsImlhdCI6MTcwNzUxOTk5OCwiZXhwIjoxNzEwMTExOTk4fQ.45kOkt2hnZAzoPzQCGuzOKPzvONW5py8ALyAyS4Raqs',
      },
    })

    const request: any = {
      body: credentials,
    }

    const response: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }

    const next = vi.fn()

    await authController.store(request, response, next)

    expect(authService.login).toHaveBeenCalledWith(credentials)
    expect(response.status).toHaveBeenCalledWith(200)
  })

  it('should call next function when an error occurs', async () => {
    const error = new Error('any_error')

    vi.spyOn(authService, 'login').mockRejectedValueOnce(error)

    const request: any = {
      body: {},
    }
    const response: any = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    }
    const next = vi.fn()

    await authController.store(request, response, next)

    expect(authService.login).toHaveBeenCalledWith({})
    expect(next).toHaveBeenCalledWith(error)
  })
})
