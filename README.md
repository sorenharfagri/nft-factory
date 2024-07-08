Setup via docker (no makefilerino)

## 1. Hardhat node
cd ./project<br>
docker compose build hardhat-modules<br>
docker compose build hardhat<br>
docker compose up -d hardhat<br>
Available at http://localhost:8545/ | wss://localhost:8545/ 

## 2. Blockscout explorer
cd ./blockscout/docker-compose<br>
docker-compose -f hardhat-network.yml up -d<br>
Available at http://127.0.0.1/

## 3. Deploy nft-factory
cd ./hardhat<br>
npm i<br>
npm run deploy:localhost:factory<br>
Сontract address will appear in the console<br>
Deployer pk 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

## 4. Backend
cd ./project<br>
docker compose build backend-modules<br>
docker compose build backend<br>
docker compose up -d backend<br>
Available at http://localhost:4337/<br>
Swagger http://localhost:4337/api

## 5. Frontend
cd ./project<br>
docker compose build frontend-modules<br>
docker compose build frontend<br>
docker compose up -d frontend<br>
Available at http://localhost:3000/

## 6. Metamask
Configure metamask to work with local node<br>
Rpc url: http://localhost:8545/<br>
Chain ID: 31337
