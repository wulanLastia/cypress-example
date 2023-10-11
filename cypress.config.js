const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'rbzy6f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },

    env: {
      base_url: "https://sidebar-jabarprov.netlify.app",
      base_url_v1: "https://devsidebar.digitalservice.id/",
      base_url_prod_v2: "https://sidebar-v2.jabarprov.go.id/",
      base_url_deploy_preview: "https://deploy-preview-402--sidebar-jabarprov.netlify.app/",
      base_url_deploy_preview2: "https://deploy-preview-330--sidebar-jabarprov.netlify.app/",
      base_url_prod_v1: "https://sidebar.jabarprov.go.id/"
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
