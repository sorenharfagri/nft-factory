import { ethers } from "ethers";
import { ActionType } from "../action-types/action-types";

export interface WalletReducerState {
    signer?: ethers.JsonRpcSigner
    address?: string
}

const initialState: WalletReducerState = {
    signer: undefined,
    address: undefined
}

export function walletReducer(state = initialState, action: any) {

    switch (action.type) {
        case ActionType.SET_SIGNER: return { ...state, signer: action.payload }
        case ActionType.SET_ADDRESS: return { ...state, address: action.payload }
        default: return state;
    }

}
