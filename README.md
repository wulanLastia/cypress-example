# cypress-sidebarv2

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
