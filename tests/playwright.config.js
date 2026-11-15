const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: '.',
  timeout: 30000,
  expect: { timeout: 5000 },
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:8123',
    headless: true,
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'python3 -m http.server 8123',
    url: 'http://127.0.0.1:8123/index.html',
    reuseExistingServer: true,
    cwd: '..',
    timeout: 30000,
  },
});
