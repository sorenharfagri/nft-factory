# Step 1: Builder
FROM project-hardhat-modules as builder
COPY . .
CMD ["hh", "node"]