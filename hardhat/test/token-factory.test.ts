import { TokenFactory, Token__factory } from "../typechain-types"
import { ethers } from "hardhat"
import { expect } from "chai"
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

describe("token-factory", () => {

    const tokenName = "JD"
    const tokenSymbol = "JD"

    let deployerAcc: HardhatEthersSigner
    let userAcc1: HardhatEthersSigner
    let userAcc2: HardhatEthersSigner

    let tokenFactory: TokenFactory


    beforeEach(async () => {
        [deployerAcc, userAcc1, userAcc2] = await ethers.getSigners()
        const contractFactory = await ethers.getContractFactory("TokenFactory", deployerAcc)
        tokenFactory = await contractFactory.deploy()
    })

    it("user can create collection", async () => {
        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()

        const filter = tokenFactory.filters.CollectionCreated();
        const creationEvents = await tokenFactory.queryFilter(filter);

        expect(creationEvents.length).to.equal(1)

        const event = creationEvents[0]

        expect(event.args.name).to.equal(tokenName)
        expect(event.args.symbol).to.equal(tokenSymbol)
        // Determenistic address
        expect(event.args.collection).to.equal("0xa16E02E87b7454126E5E10d957A927A7F5B5d2be")
    })

    it("user can mint token through factory", async () => {
        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()

        const collectionCreatedFilter = tokenFactory.filters.CollectionCreated();
        const creationEvents = await tokenFactory.queryFilter(collectionCreatedFilter);
        const creationEvent = creationEvents[0]

        const collectionAddress = creationEvent.args.collection
        const recepientAddress = userAcc2.address

        const mintTx = await tokenFactory.connect(userAcc1).mint(collectionAddress, recepientAddress)
        await mintTx.wait()

        const factoryMintFilter = tokenFactory.filters.TokenMinted()
        const factoryMintEvents = await tokenFactory.queryFilter(factoryMintFilter);
        expect(factoryMintEvents.length).to.equal(1)
        const factoryMintEvent = factoryMintEvents[0]

        const token = Token__factory.connect(collectionAddress, ethers.provider)
        const tokenTranfserFilter = token.filters.Transfer()
        const tokenTranfserEvents = await token.queryFilter(tokenTranfserFilter);
        const tokenTranfserEvent = tokenTranfserEvents[0]

        const tokenUri = await token.tokenURI(factoryMintEvent.args.tokenId)

        expect(factoryMintEvent.args.collection).to.equal(collectionAddress)
        expect(factoryMintEvent.args.recipient).to.equal(recepientAddress)
        expect(factoryMintEvent.args.tokenId).to.equal(tokenTranfserEvent.args.tokenId)
        expect(factoryMintEvent.args.tokenUri).to.equal(tokenUri)
    })




})

