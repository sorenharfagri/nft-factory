import { Container } from "@mui/material"
import { CreateCollectionBox } from "../components/create-collection-box"
import { MintBox } from "../components/mint-box"
import { ConnectBox } from "../components/connect-box"

export const Main = () => {


    return (
        <Container>
            <CreateCollectionBox />
            <MintBox />
            <ConnectBox />
        </Container >
    )

}