# Step 1: Builder
FROM project-backend-modules as builder
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]