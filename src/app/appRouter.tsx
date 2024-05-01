import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Companies, AddEmployee} from "../widgets";
import AddCompany from "../widgets/AddCompany";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Companies/>}/>
                <Route
                    path="newEmployee"
                    element={<AddEmployee/>}/>
                <Route
                    path="newCompany"
                    element={<AddCompany/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;