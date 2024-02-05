import { defineConfig } from 'vitest/config'
import tsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environmentMatchGlobs: [['e2e/**/*.spec.ts', 'vitest-enviroment-prisma']],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts', 'e2e/**/*.ts'],
      exclude: [
        'src/app.ts',
        'src/env',
        'src/**/index.ts',
        'src/**/*dto.ts',
        'src/shared/classes',
        'src/shared/enum',
      ],
    },
  },
})
