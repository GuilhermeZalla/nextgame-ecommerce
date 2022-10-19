import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

async function verifyAccount(email, password) {
    let response = await fetch(`http://localhost:3001/accounts/${email}/${password}`, {
        method: "GET",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

async function defineLogin(email){
    let response = await fetch(`http://localhost:3001/accounts/${email}/${true}`, {
        method: "PATCH",
        mode: "cors",
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let result = response.json();
    return result;
};

export const LoginForm = ({ handleFormType }) => {
    const [userEmail, setEmail] = useState();
    const [userPassword, setPassword] = useState();
    let email = useRef(null);
    let password = useRef(null);
    let warning = useRef(null);
    let navigator = useNavigate();

    const setLogin = email => defineLogin(email).then(res => navigator('/')).catch(err => console.error(`New Error: ${err}`));

    const handleLogin = () => {
         verifyAccount(userEmail, userPassword).then(res => {
             if(res){
                warning.current.style.display = 'none';
                setLogin(userEmail);
                localStorage.setItem('user', userEmail);
             }else{
                warning.current.style.display = 'block';
             }
         }).catch(err => console.error(`New Error: ${err}`));
    };

    return (
        <form>
            <fieldset>
                <legend>Login</legend>
                <p>
                    See your orders and purchases's history
                </p>
                <p>
                    <button type="button" name='google'><FcGoogle /> Sign in with Google</button>
                </p>
                <p className="personal-account">Or Login in with your email</p>
                <p>
                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" id="email" placeholder="mail@website.com" required ref={email} onBlur={e => setEmail(e.target.value)}/>
                </p>
                <p>
                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" id="password" placeholder="Min. 8 character" required ref={password} onBlur={e => setPassword(e.target.value)}/>
                </p>
                <p>
                    <button type="button" name='login' onClick={handleLogin}>Login</button>
                </p>
                <p className="warning" ref={warning}>Email and password don't match</p>
                <p>
                    Not registered yet? <button id='register' type="button" name='register' onClick={handleFormType}>Create an Account</button>
                </p>
            </fieldset>
        </form>
    );
};