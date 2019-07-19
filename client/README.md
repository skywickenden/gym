# Client for Gym

A React client based on [react-graphql-blueprint](https://github.com/skywickenden/react-graphql-blueprint)

Uses Webpack and Babel, React router, Linaria for CSS and Jest with React Testing Library for tests.
 
### Routing

Routing is performed with react-router-dom. Main route file is in `/src/routes.js`

### CSS

CSS is implemented via linaria. See `./src/layouts/main.js` for an example.

### Graphql

The server is watched for changes in the schema on the server and copies them localy. graphql-cli is installed in the Dockerfile for this purpose and `./.graphqlconfig` defines the server location in the docker. A script is defined in package.json to set the service running (see the Run section for details).

react-relay is used to generate server requests. This requires a service that compiles the react graphql code into schema requests. (See the run section for details on running the service). `./relay-environment.js` defines the process for sending queries to the server. 

Notes:

  * At present the relay process needs to be run manaully whenever a change is made.
  * The schema will constantly be regenerated with a new timestamp. This can be annoying for commits. Waiting on https://github.com/graphql-cli/graphql-cli/issues/458 to improve this.

### Test

Testing is performed using Jest and SuperTest. See an example in `./foo.test.js`. Run tests from the parent folder with `docker-compose run --rm client npm run test`.  For an example of how to test css see `./src/layouts/main.js`.

### Linting

Linting is done with eslint. Run the linter with `docker-compose run --rm client npm run lint`.
