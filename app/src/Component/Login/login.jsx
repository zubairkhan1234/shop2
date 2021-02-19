
import React from 'react'


function Login() {

    function login(event) {
        event.preventDefault()

        var loginEmail = document.getElementById('Email').value
        var loginPassword = document.getElementById('Password').value
    
        // console.log(loginEmail, loginPassword)
    
    
        const Http = new XMLHttpRequest();
        // const url = "http://localhost:3000/login"
        Http.open("POST", "http://localhost:5000/login")
        Http.setRequestHeader("Content-Type", "application/json");
        Http.send(JSON.stringify({
            email: loginEmail,
            password: loginPassword
        }));
    
    
        Http.onreadystatechange = (e) => {
            if (Http.readyState === 4) {
    
                // console.log(Http.responseText);
                const jsonResponse = JSON.parse(Http.responseText)
                // console.log(jsonResponse)
                if (jsonResponse.status === 200) {
                    alert(jsonResponse.token);
                    console.log(jsonResponse.token)
                    localStorage.setItem("token", jsonResponse.token)
                    window.location.href="home.html";
                } else {
                    alert(jsonResponse.message);
                }
            }
        }
    
        return false;
    
    }



    return (
        <>
            <div>
                <h1>Login Form</h1>
                <form onSubmit={login}>
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