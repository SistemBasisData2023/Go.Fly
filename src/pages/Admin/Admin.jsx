import React from "react";
import { GiAirplaneDeparture, GiAirplaneArrival } from "react-icons/gi";
import { RiUserFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import '../../styles/Admin/admin.css';

const Admin = () => {
    return (
        <main className="admin-wrapper">
            <div>
                <h1>Gofly Admin</h1>
                <h3>Admin Access</h3>

                <div className="button-group">
                    <div>
                        <h2>Add Flight</h2>
                        <p>To add Flight</p>
                        <Link to="/admin/add-flight">
                            <button className="btn-admin">
                                Add Flight
                            </button>
                        </Link>
                    </div>

                    <div>
                        <h2>Edit Flight</h2>
                        <p>To edit Flight</p>
                        <Link to="/admin/edit-flight">
                            <button className="btn-admin">
                                Edit Flight
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="button-group">
                    <div>
                        <h2>Add Booking</h2>
                        <p>To add Booking</p>
                        <Link to="/admin/add-booking">
                            <button className="btn-admin">
                                Add Booking
                            </button>
                        </Link>
                    </div>

                    <div>
                        <h2>Edit Booking</h2>
                        <p>To edit Booking</p>
                        <Link to="/admin/edit-booking">
                            <button className="btn-admin">
                                Edit Booking
                            </button>
                        </Link>
                    </div>
                </div>

                <div className="button-group">
                    <div>
                        <h2>Add Aircraft</h2>
                        <p>To add Aircraft</p>
                        <Link to="/admin/add-aircraft">
                            <button className="btn-admin">
                                Add Aircraft
                            </button>
                        </Link>
                    </div>

                    <div>
                        <h2>Edit Airlines</h2>
                        <p>To edit Airlines</p>
                        <Link to="/admin/edit-airline">
                            <button className="btn-admin">
                                Edit Airlines
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Admin;