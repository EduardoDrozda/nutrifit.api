import { PrismaClient } from '@prisma/client'

export class PrismaRepository extends PrismaClient {
  constructor() {
    super()
  }

  async connect() {
    await this.$connect()
  }

  async disconnect() {
    await this.$disconnect()
  }
}
