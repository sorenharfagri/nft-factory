import config from 'config'
import { AppEnv } from './app-env'

const node_env = normalizeEnv(process.env.NODE_ENV) || AppEnv.development

const serverConfig: any = config.get("server")
let node: any = config.get("node")
let tokenFactory: any = config.get("tokenFactory")

// TODO not good
if (process.env.NODE_WSS != undefined) {
    node.wss = process.env.NODE_WSS
}

if (process.env.NODE_HTTP != undefined) {
    node.wss = process.env.NODE_HTTP
}

if (process.env.FACTORY_ADDRESS != undefined) {
    tokenFactory.address = process.env.FACTORY_ADDRESS
}

let cfg: IConfig = {
    node_env,
    server: {
        port: process.env.PORT || serverConfig.port || 3000
    },
    node,
    tokenFactory
}

export = cfg

interface IConfig {
    node_env: AppEnv
    server: {
        port: number
    }
    node: {
        wss: string
        http: string
    }
    tokenFactory: {
        address: string
    }
}


function normalizeEnv(name: string): AppEnv {
    const isEnum = AppEnv[name]

    if (!isEnum) {
        return AppEnv.development
    }

    return name as AppEnv
}

