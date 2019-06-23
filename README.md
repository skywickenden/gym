# react-client-blueprint

A React client based on [react-client-blueprint](https://github.com/skywickenden/api-blueprint) and designed to work with [graphql-node-blueprint](https://github.com/skywickenden/graphql-node-blueprint) backend

Uses Webpack and Babel, React router, Linaria for CSS and Jest with React Testing Library for tests.

### Setup

Create a new repository from this template on the Github website by clicking on the `create from template` button in the top right.

Create a local folder for docker-compose files. `cd` into it and the clone your new repository. After cloning, rename the clone folder as `client`. Copy the contents of `example.env` and `example.docker-compose.yml` into the parent folder - into files without the `example.` prefix. If you are combining this with other templates then you will need to merge the contents rather than create new files. Open `.env` and ensure that CLIENT_HOST_PORT is available locally. If not then edit it appropriately.

This blueprint requires a qraphql server running in the same docker so that it can regenerate the client graphql schema from the servers schema. This assumes that [graphql-node-blueprint](https://github.com/skywickenden/graphql-node-blueprint) is running in a service called `api`. To use a different server: install into the docker-compose parent folder using a folder and service name of `api`. Then edit `./.graphqlconfig` so that `http://graphql-node-blueprint-api:3000/graphql"` points towards container name and port for the server service.
 
### Run

From the command line in the folder containing `docker-compose.yml` :

  * Build with `docker-compose build`
  * Run with `docker-compose up`

To install new packages: Run the client docker with `docker-compose run client sh` and then use `npm install <package_name>`. Type `exit` to return to your command line and then rebuild and rerun - only this time add a -V switch... `docker-compose up -V`. This will force the deletion of the anonymous node_package volume and prevent a [docker race condition issue.](https://github.com/docker/compose/issues/4337)

The main entry file is ./src/index.js

This blueprint requires four command lines to be running whilst developing. They should be started in this order:

  * The main one containing all the docker services `docker-compose up`
  * A service that watches for graphql schema changes on the server and copies them to the local schema `docker-compose run client npm run getschema`
  * A service that compiles react-graphql schema code into graphql for hot reloading. `docker-compose run client npm run relay`
  * The test runner. `docker-compose run client npm run test`

### Routing

Routing is performed with react-router-dom. Main route file is in `/src/routes.js`

### CSS

CSS is implemented via linaria. See `./src/layouts/main.js` for an example. Base template styles are in `./src/base-styles.js` - see `./src/pages/foo/AddFoo.js` for an example.

### Graphql

The server is watched for changes in the schema on the server and copies them localy. graphql-cli is installed in the Dockerfile for this purpose and `./.graphqlconfig` defines the server location in the docker. A script is defined in package.json to set the service running (see the Run section for details).

react-relay is used to generate server requests. This requires a service that compiles the react graphql code into schema requests. (See the run section for details on running the service). `./relay-environment.js` defines the process for sending queries to the server. 

Notes:

  * At present the relay process needs to be run manually whenever a change is made.
  * The schema will constantly be regenerated with a new timestamp. This can be annoying for commits. Waiting on https://github.com/graphql-cli/graphql-cli/issues/458 to improve this.

### Test

Testing is performed using Jest and SuperTest. See an example in `./foo.test.js`. Run tests from the parent folder with `docker-compose run api npm run test`.  For an example of how to test css see `./src/layouts/main.js`. `./test-utils.js` is used to setup both the test router wrapper and also `graphql-query-test-mock` to mock graphql queries.
