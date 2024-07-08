# Step 1: Modules caching
FROM node:22.4-alpine3.19 as backend-modules
COPY package*.json /modules/
WORKDIR /modules
RUN npm install