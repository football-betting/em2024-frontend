import { configDefaults, defineConfig, coverageConfigDefaults } from 'vitest/config'
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: './.env.test' })
export default defineConfig({
    test: {
        exclude: [
            ...configDefaults.exclude,
            'packages/template/*',
            'tests/acceptance/**',
        ],
    },
})
