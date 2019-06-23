# graphql-node-api

A hot reloading Express API boilerplate with graphql and mongo db and a docker-compose setup.
This extended from https://github.com/skywickenden/api-blueprint 

Uses `nodemon` for automatic server restarting.

Expects `PORT` to be set as an environment variable.

### Setup

In the parent project folder create a sub folder called 'api'. Create a new git repository in the api folder and `cd` into it. Create a new repository on github for this fork, then clone it locally with:

    git clone https://github.com/<username>/<new_repository_name>
  
Now add this repository as an upsteream remote with:
 
    git remote add upstream https://github.com/skywickenden/graphql-node-api
  
Pull the old repository down and push it back to the new one.

    git pull upstream master
    git push origin master

Copy the contents of `example.env`, `example.docker-compose.yml` and `example.mongo-init.js` into the parent folder - into files without the `example.` prefix. Add database user passwords to `.env` and `mongo-init.js`.

Then from the command line in the parent folder:

  * Build with `docker-compose build`
  * Run with `docker-compose up`

To install new packages: Run the api docker with `docker-compose run api sh` and then use `api install <package_name>`. Type `exit` to return to your command line and then rebuild and rerun - only this time add a -V switch... `docker-compose up -V`. This will force the deletion of the anonymous node_package volume and prevent a [docker race condition issue.](https://github.com/docker/compose/issues/4337)

Testing is performed using Jest and SuperTest. See an example in `./src/types/foo/foo.test.js`. Run tests from the parent folder with `docker-compose run api npm run test`
