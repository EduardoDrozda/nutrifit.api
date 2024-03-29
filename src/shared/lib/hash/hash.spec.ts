import { beforeAll, describe, expect, it } from 'vitest'
import { Hash } from './hash'

describe('Hash', () => {
  beforeAll(() => {
    process.env.HASH_SALT = '20'
  })

  it('should call hash without inform salt', async () => {
    const result = await Hash.hash('value')
    expect(result).toBeDefined()
    const compare = await Hash.compare('value', result)
    expect(compare).toBeTruthy()
  })

  it('should call hash with inform salt', async () => {
    const result = await Hash.hash('value', 10)
    expect(result).toBeDefined()
    const compare = await Hash.compare('value', result)
    expect(compare).toBeTruthy()
  })
})
