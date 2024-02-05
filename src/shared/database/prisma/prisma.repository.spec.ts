import { describe, expect, it, vi } from 'vitest'

import { PrismaRepository } from './prisma.repository'

vi.mock('@prisma/client', () => ({
  PrismaClient: class PrismaClient {
    async $connect() {}
    async $disconnect() {}
  },
}))

describe('PrismaRepository', () => {
  const prismaRepository = new PrismaRepository()

  it('should be defined', () => {
    expect(prismaRepository).toBeDefined()
  })

  it('should call prisma connect', async () => {
    const connectSpy = vi.spyOn(prismaRepository, 'connect')
    await prismaRepository.connect()
    expect(connectSpy).toHaveBeenCalledTimes(1)
  })

  it('should call prisma disconnect', async () => {
    const disconnectSpy = vi.spyOn(prismaRepository, 'disconnect')
    await prismaRepository.disconnect()
    expect(disconnectSpy).toHaveBeenCalledTimes(1)
  })
})
