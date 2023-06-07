import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"

import Flights from '../pages/Flights';
import Login from '../pages/Login';
import Register from '../pages/Register';




const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Flights />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            {/* <Route path="/DeskChoose" element={<DeskChoosePage />} />
            <Route path="/Teller" element={<TellerPage />} />
            <Route path="/transaction" element={<TransactionFormPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFound />} /> */}
        </Routes>
    )
};

export default Routers;