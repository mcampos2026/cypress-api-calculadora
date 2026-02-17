const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "https://live-devops.azurewebsites.net",
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 20000,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: true,
  },
})
