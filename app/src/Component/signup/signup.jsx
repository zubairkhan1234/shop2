import react from "react";

function Signup() {



    function signup(event) {

        event.preventDefault()

        var userName = document.getElementById('name').value
        var userEmail = document.getElementById('email').value.toLowerCase()
        var userPhone = document.getElementById('phone').value
        var userPassword = document.getElementById('password').value
    
        // console.log(userEmail)
    
        var userData = {
            userName: userName,
            userEmail: userEmail,
            userPhone: userPhone,
            userPassword: userPassword
        }
        // console.log(userData)
    
    
        document.getElementById("name").value = ""
        document.getElementById("email").value = ""
        document.getElementById("phone").value = ""
        document.getElementById("password").value = ""
    
        const Http = new XMLHttpRequest();
        // const url = "http://localhost:3000/signup";
        Http.open("POST", "http://localhost:5000/signup");
        Http.setRequestHeader("Content-Type", "application/json");
    
        Http.send(JSON.stringify(userData));
    
        Http.onreadystatechange = (e) => {
            if (Http.readyState === 4) {
    
                const jsonResponse = JSON.parse(Http.responseText)
    
                if (jsonResponse.status === 200) {
                    alert(jsonResponse.message);
                    // console.log(jsonResponse.message);
                    // window.location.href="login.html";
                } else {
                    // console.log(jsonResponse.message);
                    alert(jsonResponse.message);
                }
            }
        }
        return false;
    
    }

    return (
        <>
            <div>
                <h1>Signup From</h1>
                <form onSubmit={signup}>
                    <label>Name :</label><br />
                    <input type="text" placeholder="Enter your username" id="name" /><br />
                    <label>Email :</label><br />
                    <input type="email" placeholder="Enter your Email" id="email" /><br />
                    <label>Phone Number</label><br />
                    <input type="number" placeholder="Enter your phone number" id="phone" /><br />
                    <label>Password</label><br />
                    <input type="text" placeholder="Enter your password" id="password" /><br />
                    <button type="submit">SignUp</button>

                </form>

            </div>

        </>
    )


}

export default Signup ;