import React from 'react'
import Login from '../Login/login'
import Signup from '../signup/signup'
import Dashboard from '../dashboard/dashboard'


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


function Navigation() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Dashboard />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}


export default Navigation; 

