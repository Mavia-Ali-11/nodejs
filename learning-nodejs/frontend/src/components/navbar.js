import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className='header'>
            <Link to="/">All Employees</Link>
            <Link to="/employee-form">Add Employees</Link>
        </div>
    )
}

export default Navbar;