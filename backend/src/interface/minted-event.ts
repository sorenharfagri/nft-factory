import { ApiProperty } from "@nestjs/swagger";


export class TokenMintedEvent {

    @ApiProperty({ type: String })
    collection: string

    @ApiProperty({ type: String })
    recipient: string

    @ApiProperty({ type: String })
    tokenId: string

    @ApiProperty({ type: String })
    tokenUri: string
}