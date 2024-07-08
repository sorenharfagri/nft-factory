import { ApiProperty } from "@nestjs/swagger"


export class CollectionCreatedEvent {
    @ApiProperty({ type: String })
    collection: string

    @ApiProperty({ type: String })
    name: string

    @ApiProperty({ type: String })
    symbol: string
}