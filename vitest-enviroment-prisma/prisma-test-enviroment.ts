import { PrismaClient } from '@prisma/client'
import 'dotenv/config'
import { execSync } from 'node:child_process'

import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  setup: async () => {
    const schema = randomUUID()
    const databaseUrl = generateDatabaseURL(schema)
    console.log(databaseUrl)
    process.env.DATABASE_URL = databaseUrl

    execSync('npx prisma migrate deploy')

    return {
      teardown: async () => {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
      },
    }
  },
  transformMode: 'ssr',
}
