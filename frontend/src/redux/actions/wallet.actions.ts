import { ethers } from "ethers";
import { ActionType } from "../action-types/action-types";



export function setWallet(signer: ethers.JsonRpcSigner, address: string) {

    return function (dispatch: any) {
        dispatch(setSigner(signer))
        dispatch(setAddress(address))
    }
}

function setSigner(signer: ethers.JsonRpcSigner) {
    return {
        type: ActionType.SET_SIGNER,
        payload: signer
    }
}

function setAddress(address: string) {
    return {
        type: ActionType.SET_ADDRESS,
        payload: address
    }
}