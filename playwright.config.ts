import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 2,
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['list']
  ],

use: {
  baseURL: 'https://www.saucedemo.com',
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'on-first-retry',
},

projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.ts/,
  },
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup'],
  },
  {
    name: 'firefox',
    use: {
      ...devices['Desktop Firefox'],
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup'],
  },
]
});