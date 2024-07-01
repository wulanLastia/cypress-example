const { defineConfig } = require('cypress')
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const cypressWebpackConfig = require('./cypressWebpackConfig');
require('dotenv').config()

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
      on('file:preprocessor', webpackPreprocessor({
        webpackOptions: cypressWebpackConfig,
        watchOptions: {},
      }));
    },

    env: {
      base_url: process.env.BASE_URL,
      base_url_v1: process.env.BASE_URL_V1,
      base_url_prod_v2: process.env.BASE_URL_PROD_V2,
      base_url_prod_v1: process.env.BASE_URL_PROD_V1,
      base_url_api_v1: process.env.BASE_URL_API_V1,
      base_url_api_v2: process.env.BASE_URL_API_V2,
      base_url_api_prod_v2: process.env.BASE_URL_API_PROD_V2,
      cypress_layout: process.env.CYPRESS_DRAFTING_LAYOUT,
      base_url_login_sso: process.env.BASE_URL_LOGIN_SSO,
    },

    testIsolation: true,

    retries: {
      runMode: 2,
      openMode: 1,
    },

  },
  "reporter": "cypress-qase-reporter",
  "reporterOptions": {
    "projectCode": "SIDEBARV2",
    "logging": true,
    "runComplete": true,
    "sendScreenshot": false,
    "video": false,
    "basePath": "https://api.qase.io/v1",
    "environmentId": 1,
    "apiToken": process.env.QASE_API_TOKEN,
  },
  "chromeWebSecurity": false,
  // Width x Height preview in cypress GUI
  "viewportWidth": 1440,
  "viewportHeight": 900,
})
