import React from 'react';
// import Login from '../Login/login'
// import Signup from '../signup/signup'
// import Dashboard from '../dashboard/dashboard'


// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
// } from "react-router-dom";
import {
    Link
} from "react-router-dom";



function AppRoute() {
    return (
        <>
            <div>
                <Link to="/">Dashboard</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">SignUp</Link>
            </div>
        </>
    )
}


export default AppRoute