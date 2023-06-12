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
      base_url_deploy_preview: "https://deploy-preview-317--sidebar-jabarprov.netlify.app/"

    },

    testIsolation: true,

  },
  "reporter": "cypress-qase-reporter",
  "reporterOptions": {
    "apiToken": "c3d992720d9ef15f98784893f5c63ea8d10b0359",
    "projectCode": "SIDEBAR2",
    "logging": true,
    "runComplete": true,
    "sendScreenshot": false,
    "video": false,
    "basePath": "https://api.qase.io/v1"
  },
  "chromeWebSecurity": false,
  // Width x Height preview in cypress GUI 
  "viewportWidth": 1400,
  "viewportHeight": 900,
})