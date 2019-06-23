FROM node:12.2-alpine

WORKDIR /usr/src/app

RUN npm install -g graphql-cli

COPY package*.json ./

RUN npm install

COPY . .