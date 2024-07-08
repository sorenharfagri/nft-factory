import { Box, Button, TextField } from "@mui/material"
import { SetStateAction, useRef, useState } from "react"
import { CollectionCreateService } from "../services/collection-create.service";
import { NotificationsService } from "../services/notifications.service";

export const CreateCollectionBox = () => {

    const [nameInput, setNameInput] = useState('');
    const [symbolInput, setSymbolInput] = useState('');

    const handleNameChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setNameInput(event.target.value);
    };


    const handleSymbolChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSymbolInput(event.target.value);
    };

    const onButtonClick = async () => {

        if (!isValidInput(nameInput)) {
            NotificationsService.error("Invalid name")
            return
        }

        if (!isValidInput(symbolInput)) {
            NotificationsService.error("Invalid symbol")
            return
        }

        await CollectionCreateService.create(nameInput, symbolInput)
    };

    return (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <TextField onChange={handleNameChange} id="outlined-basic" label="Token Name" sx={{ width: '300px' }} variant="outlined" />
            <TextField onChange={handleSymbolChange} id="outlined-basic" label="Token Symbol" sx={{ width: '300px' }} variant="outlined" />
            <Button onClick={onButtonClick} variant="contained" sx={{ width: '80px' }}>Create</Button>
        </Box>
    )
}

function isValidInput(input: string): boolean {
    if (input.length === 0) {
        return false;
    }

    if (input.includes(' ')) {
        return false;
    }

    return true;
}