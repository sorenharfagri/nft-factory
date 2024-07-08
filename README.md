Setup via docker (no makefilerino)

1. Hardhat node
cd ./project
docker compose build hardhat-modules
docker compose build hardhat
docker compose up -d hardhat
Available at http://localhost:8545/ | wss://localhost:8545/ 

2. Blockscout explorer
cd ./blockscout/docker-compose
docker-compose -f hardhat-network.yml up -d
Available at http://127.0.0.1/

3. Deploy nft-factory
cd ./hardhat
npm i
npm run deploy:localhost:factory
Сontract address will appear in the console
Deployer pk 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

4. Backend
cd ./project
docker compose build backend-modules
docker compose build backend
docker compose up -d backend
Available at http://localhost:4337/
Swagger http://localhost:4337/api

5. Frontend
cd ./project
docker compose build frontend-modules
docker compose build frontend
docker compose up -d frontend
Available at http://localhost:3000/

6. MetaMask
Configure metamask to work with local node
Rpc url: http://localhost:8545/
Chain ID: 31337