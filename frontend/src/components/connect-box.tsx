import { Box, Button } from "@mui/material"
import { WalletSevice } from "../services/wallet.service"
import { useDispatch } from "react-redux"


export const ConnectBox = () => {

    useDispatch()


    const handleClick = async () => {
        await WalletSevice.connect()
    }


    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
            <Button onClick={handleClick} variant="contained">Connect</Button>
        </Box>
    )
}