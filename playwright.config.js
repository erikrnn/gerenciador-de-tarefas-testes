const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/system',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    headless: true
  },
  webServer: {
    command: 'npm start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: true
  }
});
