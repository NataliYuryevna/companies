import React from 'react';
import AppRouter from "./appRouter";
import {GlobalStyle, FontStyles} from "../shared/lib";

function App() {
    return (
        <div className="App">
            <GlobalStyle/>
            <FontStyles/>
            <AppRouter/>
        </div>
    );
}

export default App;
