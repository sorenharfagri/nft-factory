import { TokenFactory, Token__factory } from "../typechain-types"
import { ethers } from "hardhat"
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai"

describe("token", () => {

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

    it("collection can be deployed from factory", async () => {
        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()
    })

    it("collection cannot be deployed from wallet", async () => {
        const factory = await ethers.getContractFactory("Token", deployerAcc)
        const deployTx = factory.deploy(tokenSymbol, tokenName)
        await expect(deployTx).to.be.revertedWithCustomError({ interface: Token__factory.createInterface() }, "OwnableInvalidFactory")
    })

    it("owner can mint from factory", async () => {

        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()

        const collectionCreatedFilter = tokenFactory.filters.CollectionCreated();
        const creationEvents = await tokenFactory.queryFilter(collectionCreatedFilter);
        const creationEvent = creationEvents[0]

        const collectionAddress = creationEvent.args.collection
        const recepientAddress = userAcc2.address

        const mintTx = await tokenFactory.connect(userAcc1).mint(collectionAddress, recepientAddress)
        await mintTx.wait()

        const token = Token__factory.connect(collectionAddress, ethers.provider)
        const tokenTranfserFilter = token.filters.Transfer()
        const tokenTranfserEvents = await token.queryFilter(tokenTranfserFilter);

        expect(tokenTranfserEvents.length).to.equal(1)
        const transferEvent = tokenTranfserEvents[0]
        expect(transferEvent.args.to).to.equal(recepientAddress)
    })

    it("mint from invalid owner should fail", async () => {
        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()

        const collectionCreatedFilter = tokenFactory.filters.CollectionCreated();
        const creationEvents = await tokenFactory.queryFilter(collectionCreatedFilter);
        const creationEvent = creationEvents[0]

        const collectionAddress = creationEvent.args.collection
        const recepientAddress = userAcc2.address

        const mintTx = tokenFactory.connect(userAcc2).mint(collectionAddress, recepientAddress)
        await expect(mintTx).to.be.revertedWithCustomError({ interface: Token__factory.createInterface() }, "OwnableUnauthorizedAccount")
    })

    it("mint from other factory should fail", async () => {
        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()

        const collectionCreatedFilter = tokenFactory.filters.CollectionCreated();
        const creationEvents = await tokenFactory.queryFilter(collectionCreatedFilter);
        const creationEvent = creationEvents[0]

        const collectionAddress = creationEvent.args.collection
        const recepientAddress = userAcc2.address

        const contractFactory = await ethers.getContractFactory("TokenFactory", userAcc1)
        const tokenFactory2 = await contractFactory.deploy()


        const mintTx = tokenFactory2.connect(userAcc1).mint(collectionAddress, recepientAddress)
        await expect(mintTx).to.be.revertedWithCustomError({ interface: Token__factory.createInterface() }, "OwnableUnauthorizedFactory")
    })

    it("mint from wallet should fail", async () => {
        const creationTx = await tokenFactory.connect(userAcc1).createCollection(tokenName, tokenSymbol)
        await creationTx.wait()

        const collectionCreatedFilter = tokenFactory.filters.CollectionCreated();
        const creationEvents = await tokenFactory.queryFilter(collectionCreatedFilter);
        const creationEvent = creationEvents[0]

        const collectionAddress = creationEvent.args.collection
        const recepientAddress = userAcc2.address

        const token = Token__factory.connect(collectionAddress, ethers.provider)
        token.connect(userAcc1)

        const mintTx = token.connect(userAcc1).mint(recepientAddress)
        await expect(mintTx).to.be.revertedWithCustomError({ interface: Token__factory.createInterface() }, "OwnableUnauthorizedFactory")
    })
})

