# API for gym

An Express API with graphql and mongoose. Based on [graphql-node-blueprint](https://github.com/skywickenden/graphql-node-blueprint)

### Schema

The schema is pulled together in `/src/schema.js` with types in `/src/types/`

### Mongo

Rahter than a seperate DB layer folder, Mongo code is in a `model.js` file inside each type folder.
