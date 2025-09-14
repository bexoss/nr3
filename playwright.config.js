// @ts-check
const { defineConfig } = require('@playwright/test')

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'

module.exports = defineConfig({
  timeout: 30000,
  retries: 0,
  use: {
    baseURL: BASE_URL,
    headless: true
  },
  reporter: [['list']]
})
