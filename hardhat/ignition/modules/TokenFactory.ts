import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


const TokenFactoryModuel = buildModule("TokenFactory", (m) => {
    const tokenFactroy = m.contract("TokenFactory");

    return { tokenFactroy };
});

export default TokenFactoryModuel;
