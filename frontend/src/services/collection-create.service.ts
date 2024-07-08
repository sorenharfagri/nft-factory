import { ethers } from "ethers";
import { factoryAddress } from "./config.service";
import { store } from "../index"
import { NotificationsService } from "./notifications.service";
import { TOKEN_FACTORY_ABI } from "../utils/abi/token-factory.abi";

export class CollectionCreateService {


    static async create(name: string, symbol: string) {

        if (!name) {
            NotificationsService.error("Token name is empty")
            return
        }

        if (!symbol) {
            NotificationsService.error("Token symbol is empty")
            return
        }

        const provider = store.getState().walletReducer?.signer
        if (!provider) {
            NotificationsService.error("Provider not found")
            return
        }


        await this._create(name, symbol, provider)
    }

    private static async _create(name: string, symbol: string, provider: ethers.JsonRpcSigner) {
        const contract = new ethers.Contract(factoryAddress, TOKEN_FACTORY_ABI, provider);

        let txResponse

        try {
            txResponse = await contract.createCollection(name, symbol);
        } catch (e) {
            NotificationsService.error("Unable to send tx")
            console.error(e)
            return
        }

        NotificationsService.success("Transaction sent")

        try {
            const txReceipt: ethers.TransactionReceipt = await txResponse.wait();
            const logs = txReceipt.logs

            for (let log of logs) {
                const isCreateCollectionLog = log.topics.find(topic => topic == createCollectionTopic)

                if (!isCreateCollectionLog) {
                    continue
                }

                const logParsed = factoryInterface.parseLog(log)
                if (!logParsed) {
                    NotificationsService.error(`Unable to parse create collection log`)
                    return
                }

                NotificationsService.success(`Successfully created ${logParsed?.args[0]}`)
            }

        } catch (e) {
            NotificationsService.error("Transaction failed")
            console.error(e)
            return
        }


    }

}

let factoryInterface = new ethers.Interface(TOKEN_FACTORY_ABI)
const createCollectionTopic = "0x3454b57f2dca4f5a54e8358d096ac9d1a0d2dab98991ddb89ff9ea1746260617";