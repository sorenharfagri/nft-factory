import { Box, Button, TextField } from "@mui/material"
import { MintService } from "../services/mint.service";
// import { isAddress } from 'web3-validator';
import { isAddress } from "ethers"
import { SetStateAction, useRef, useState } from "react";
import { NotificationsService } from "../services/notifications.service";


export const MintBox = () => {

    const [collectionInput, setCollectionInput] = useState('');
    const [receiverInput, setReceiverInput] = useState('');

    const handleCollectionChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setCollectionInput(event.target.value);
    };


    const handleReceiverChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setReceiverInput(event.target.value);
    };


    const onButtonClick = async () => {
        if (!isAddress(collectionInput)) {
            NotificationsService.error("Invalid collection")
            return
        }

        if (!isAddress(receiverInput)) {
            NotificationsService.error("Invalid receiver")
            return
        }

        await MintService.mint(collectionInput, receiverInput)
    };

    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <TextField onChange={handleCollectionChange} id="outlined-basic" label="Collection" sx={{ width: '300px' }} variant="outlined" />
            <TextField onChange={handleReceiverChange} id="outlined-basic" label="Receiver" sx={{ width: '300px' }} variant="outlined" />
            <Button onClick={onButtonClick} variant="contained" sx={{ width: '80px' }}>Mint</Button>
        </Box>
    )
}