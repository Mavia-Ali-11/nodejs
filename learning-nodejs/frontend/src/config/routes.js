import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "../components/navbar";
import AllEmployees from "../components/allEmployees"
import AddEmployee from "../components/addEmployee";

export default function Navigations() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<AllEmployees />} />
                <Route path="/employee-form" element={<AddEmployee />} />
            </Routes>
        </BrowserRouter>
    );
}