import { setWallet } from "../redux/actions/wallet.actions";
import { store } from "../index"
import { NotificationsService } from "./notifications.service";
import { ethers } from "ethers"



export class WalletSevice {

    static async connect() {

        if (!window.ethereum) {
            NotificationsService.error("MetaMask not installed")
            return
        }

        if (!window.ethereum.isMetaMask) {
            NotificationsService.error("MetaMask not installed")
            return
        }

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' })

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress()

            window.ethereum.on('accountsChanged', () => window.location.reload());
            window.ethereum.on('chainChanged', () => window.location.reload());
            window.ethereum.on('disconnect', () => window.location.reload());

            store.dispatch(setWallet(signer, address))

            NotificationsService.success(`${address} connected`)
        } catch (error) {
            NotificationsService.error(`Connection failed ${error}`)
            return
        }

    }
}