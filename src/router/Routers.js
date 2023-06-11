import React from "react"
import {Routes, Route, Navigate} from "react-router-dom"

import Flight from '../pages/Flight';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ThankYou from '../pages/ThankYou';
import Booking from "../pages/Booking";
import Search from "../pages/Search";
import Admin from "../pages/Admin/Admin";

const Routers = () => {
    return (
    <Routes>
        <Route path='/' element={<Navigate to='flight'/>}/>
        <Route path='/flight' element={<Flight />}/>
        <Route path='/tour' element={<Tours />}/>
        <Route path='/tour/:id' element={<TourDetails />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/thank-you' element={<ThankYou />}/>
        <Route path='/booking' element={<Booking />}/>
        <Route path='/search' element={<Search />}/>
        <Route path='/admin' element={<Admin />}/>
    </Routes>
    )
};

export default Routers;