
import React from 'react'


function Login() {
    return (
        <>
            <div>
                <h1>Login Form</h1>
                <form>
                    <label>Email: </label><br />
                    <input type="text" placeholder="Enter your Email" id="Email" /><br />
                    <label>Password: </label><br />
                    <input type="text" placeholder="Enter your Email" id="Password" /><br />
                    <button>Login Now</button>
                </form>
            </div>
        </>
    )
}


export default Login;