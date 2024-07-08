let factoryAddress: string



function init() {
    const factoryAddressEnv = process.env.REACT_APP_FACTORY_ADDRESS;

    if (!factoryAddressEnv) {
        throw new Error("Provde factory address via process.env.REACT_APP_FACTORY_ADDRESS")
    }

    factoryAddress = factoryAddressEnv
}

init()



export { factoryAddress }