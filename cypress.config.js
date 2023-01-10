const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'rbzy6f',
    e2e: {
      setupNodeEvents(on, config) {
        // implement node event listeners here
      },

      env: {
        base_url: "https://sidebar-jabarprov.netlify.app"
      },
    },
    "reporter": "cypress-qase-reporter",
    "reporterOptions": {
        "apiToken": "4d3d3edc2670b9a997ebdac5e28232f418208067",
        "projectCode": "SIDEBAR2",
        "logging": true,
        "runComplete": true,
        "sendScreenshot": false,
        "video": false,
        "basePath": "https://api.qase.io/v1"
    }
})