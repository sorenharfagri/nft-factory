import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import { node } from "src/parse-cfg/parse-cfg";

@Injectable()
export class ProvidersService {

    private wssProvider: ethers.WebSocketProvider = new ethers.WebSocketProvider(node.wss)
    private httpProvider: ethers.JsonRpcProvider = new ethers.JsonRpcProvider(node.http)


    public getWss(): ethers.WebSocketProvider {
        return this.wssProvider
    }

    public getHttp(): ethers.JsonRpcProvider {
        return this.httpProvider
    }
}