import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { EventsService } from "src/services/events.service";
import { CollectionCreatedEvent, TokenMintedEvent } from "src/utils/typechain-types/TokenFactory";

@Controller("/events")
@ApiTags('Events')
export class EventsController {

    constructor(
        private eventsService: EventsService
    ) { }

    @Get("/collectionCreated")
    @ApiOkResponse({
        description: 'Returns array of events'
    })
    getCollectionCreatedEvents(
    ) {
        return this.eventsService.getCollectionCreatedEvents()
    }

    @Get("/tokenMinted")
    @ApiOkResponse({
        description: 'Returns array of events',
        
    })
    getTokenMintedEvents(
    ) {
        return this.eventsService.getTokenMitnedEvents()
    }
}