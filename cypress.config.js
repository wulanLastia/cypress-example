const { defineConfig } = require('cypress')
const { generateFeatureToggleOverrideJWT } = require('./helpers/feature_toggle_helper')

module.exports = defineConfig({
  projectId: 'rbzy6f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        /* because the jwt generation feature is asynchronous, we need to
         * create it as a custom task instead of a custom command. we can
         * wrap this task later inside a custom command to automatically
         * set the cookie
         */
        generateFeatureToggleOverrideJWT(args) {
          const toggles = args?.toggles
          const expirationTime = args?.expirationTime
          return generateFeatureToggleOverrideJWT(toggles, expirationTime)
        }
      })
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
