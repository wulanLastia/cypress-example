const { defineConfig } = require('cypress')
require('dotenv').config()

module.exports = defineConfig({
  projectId: 'rbzy6f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      base_url: process.env.BASE_URL,
      base_url_v1: process.env.BASE_URL_V1,
      base_url_prod_v2: process.env.BASE_URL_PROD_V2,
      base_url_prod_v1: process.env.BASE_URL_PROD_V1,
      base_url_api_v1: process.env.BASE_URL_API_V1,
      base_url_api_v2: process.env.BASE_URL_API_V2
    },

    testIsolation: true,

    retries: {
      runMode: 2,
      openMode: 1,
    },

  },
  "reporter": "cypress-qase-reporter",
  "reporterOptions": {
    "projectCode": "SIDEBAR2",
    "logging": true,
    "runComplete": false,
    "sendScreenshot": false,
    "video": false,
    "basePath": "https://api.qase.io/v1",
    "environmentId": 1,
  },
  "chromeWebSecurity": false,
  // Width x Height preview in cypress GUI 
  "viewportWidth": 1440,
  "viewportHeight": 900,
})
