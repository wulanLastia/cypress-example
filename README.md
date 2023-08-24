# cypress-sidebarv2

## How to run locally
1. clone and cd to folder
2. `npm install`
3. copy `.env.example` to `.env`
4. Run locally using:

  ```
  # basic example
  $ npm run cy_local_test -- --spec example.cy.js

  # you could add any cypress CLI options after the '--', for example to enable recording to cypress cloud
  $ npm run cy_local_test -- --record

  # to customize QASE_RUN_NAME on each run
  $ QASE_RUN_NAME="running test local fulan" npm run cy_local_test -- --record

  # to set dynamic QASE_RUN_NAME on each run by datetime
  $ QASE_RUN_NAME="$(date +'%Y-%m-%d_%H:%M:%S') - running test local fulan" npm run cy_local_test -- --record
  ```

## How to run using github action
1. Open the repo
2. Go to "Actions" tab
3. Select "E2E Cypress Test Manual" from list sidebar
4. Click the "Run workflow" dropdown button, a popup would showed up. Fill the fields accordingly.

  ![Github Action screenshot](docs/screenshot-manual-run-github-action.png?raw=true "Github Action manual run form input")

  > Tips: 
  > - for `run_name` option, its better to include your name to better differentiate between runs by different people
  > - To easily get the path to your desired spec file, you could use the github web repo interface to open the file and then copy the path by click copy symbol beside the filename
  ![Github copy path screenshot](docs/screenshot-copy-path-github.png?raw=true "The copy symbol in github interface")

5. Click "Run workflow" in the bottom of the popup to start the test
6. Monitor the process. If it finished you should be able to see via qase.io and cloud.cypress.io
