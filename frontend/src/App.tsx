// @ts-nocheck
import React from 'react';
import { SnackbarProvider } from "notistack";
import { BrowserRouter as Router } from 'react-router-dom';

import { Main } from './pages/main';

const App = () => {

    return (
        <Router>
            <SnackbarProvider maxSnack={5}>
                <Main />
            </SnackbarProvider>
        </Router >
    )
};

export default App;