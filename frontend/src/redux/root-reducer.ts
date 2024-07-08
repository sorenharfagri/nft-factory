import { combineReducers } from "redux";
import { walletReducer } from "./reducers/wallet.reducer";


export const rootReducer = combineReducers({
    walletReducer
});