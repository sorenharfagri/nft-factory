# Step 1: Modules caching
FROM node:22.4-alpine3.19 as hardhat-modules
COPY package*.json /modules/
WORKDIR /modules
RUN npm install
RUN npm i -g hardhat-shorthand