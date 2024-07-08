# Step 1: Modules caching
FROM node:22.4-alpine3.19 as frontend-modules
COPY package*.json /modules/
WORKDIR /modules
RUN npm config -g set legacy-peer-deps true
RUN npm install