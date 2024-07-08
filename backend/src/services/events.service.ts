import { Injectable } from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { TokenFactory__factory, } from "src/utils/typechain-types";
import { tokenFactory as tokenFactoryCfg } from "src/parse-cfg/parse-cfg";
import { CollectionCreatedEvent } from "../interface/collection-created-event"
import { TokenMintedEvent } from "../interface/minted-event"
import { ContractEventPayload } from "ethers";

@Injectable()
export class EventsService {

    constructor(private providersService: ProvidersService) { }

    private collectionCreatedEvents: CollectionCreatedEvent[] = []
    private tokenMitnedEvents: TokenMintedEvent[] = []

    async onModuleInit() {
        const provider = this.providersService.getWss()
        const tokenFactory = TokenFactory__factory.connect(tokenFactoryCfg.address, provider)
        const collectionCreatedFilter = tokenFactory.filters.CollectionCreated()
        const tokenMintedFilter = tokenFactory.filters.TokenMinted()

        // infers wrong type
        //@ts-ignore
        tokenFactory.on(collectionCreatedFilter, (event: ContractEventPayload) => {

            this.collectionCreatedEvents.push({ collection: event.args[0], name: event.args[1], symbol: event.args[2] })
        })

        //@ts-ignore
        tokenFactory.on(tokenMintedFilter, (event: ContractEventPayload) => {
            this.tokenMitnedEvents.push({ collection: event.args[0], recipient: event.args[1], tokenId: event.args[2].toString(), tokenUri: event.args[3] })
        })
    }


    getCollectionCreatedEvents(): CollectionCreatedEvent[] {
        return this.collectionCreatedEvents
    }

    getTokenMitnedEvents(): TokenMintedEvent[] {
        return this.tokenMitnedEvents
    }
}