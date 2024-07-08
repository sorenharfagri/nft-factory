import { NotificationsService } from "./notifications.service";
import { store } from "../index"
import { ethers } from "ethers";
import { factoryAddress } from "./config.service";
import { TOKEN_FACTORY_ABI } from "../utils/abi/token-factory.abi";


export class MintService {

    static async mint(collection: string, receiver: string) {
        if (!collection) {
            NotificationsService.error("Collection is empty")
            return
        }

        if (!receiver) {
            NotificationsService.error("Receiver is empty")
            return
        }

        const provider = store.getState().walletReducer?.signer
        if (!provider) {
            NotificationsService.error("Provider not found")
            return
        }


        await this._mint(collection, receiver, provider)
    }

    static async _mint(collection: string, receiver: string, provider: ethers.JsonRpcSigner) {
        const contract = new ethers.Contract(factoryAddress, TOKEN_FACTORY_ABI, provider);

        let txResponse

        try {
            txResponse = await contract.mint(collection, receiver);
        } catch (e) {
            NotificationsService.error("Unable to send tx")
            console.error(e)
            return
        }

        NotificationsService.success("Transaction sent")

        try {
            await txResponse.wait();
            
            NotificationsService.success(`Successfully minted`)
        } catch (e) {
            NotificationsService.error("Transaction failed")
            console.error(e)
            return
        }
    }

}