FROM node:12.2-alpine

WORKDIR /usr/src/app

RUN npm install -g nodemon

COPY package*.json ./

RUN npm install 

COPY . .
