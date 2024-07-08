# Step 1: Builder
FROM project-frontend-modules as builder
COPY . .
CMD ["npm", "start"]