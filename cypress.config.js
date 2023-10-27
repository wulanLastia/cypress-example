const { defineConfig } = require('cypress')
const { generateFeatureToggleOverrideJWT } = require('./cypress/support/util')

module.exports = defineConfig({
  projectId: 'rbzy6f',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        /* A custom task to generate JWT token for overriding Unleash toggles.
         *
         * We decided to separate this function from `overrideFeatureToggle`
         * command because when we put the below code there it keeps failing.
         * It seems this is because the jwt generation feature is asynchronous,
         * so it conflicting with Cypress's async system. So to work around
         * the issue, we wrap this function into a custom task that could be
         * called from inside the `overrideFeatureToggle` custom command.
         *
         * More References:
         * - https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Commands-Are-Asynchronous : official documentation about how cypress asynchronous command worked
         * - https://stackoverflow.com/q/65736979 : Here the asker also use custom
         *   task to work around async code issue
         * - https://stackoverflow.com/questions/58680757/in-cypress-when-to-use-custom-command-vs-task : explanation regarding custom task vs custom command, and use cases for each of them
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
