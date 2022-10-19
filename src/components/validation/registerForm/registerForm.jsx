import { useRef, useState } from "react";

async function verifyData(value){
    let response = await fetch(`http://localhost:3001/accounts/verify/${value}`, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers:{
            "Accept": "applcation*json",
            "Content-Type": "application/json"
        }
    });
    let result = response.json();
    return result;
};

export const RegisterForm = ({ handleFormType }) => {
    const [emailExists, setEmailExists] = useState(false);
    const [usernameExists, setUsernameExists] = useState(false);
    let email = useRef(null);
    let username = useRef(null);
    let invalidEmail = useRef(null);
    let invalidUsername = useRef(null);

    const verifyEmailExists = e => {
        verifyData(e.target.value).then(res => {
            if(res === null){
                setEmailExists(false);
            }else{
                setEmailExists(true);
                email.current.value = '';
            }
        }).catch(err => console.error(err));
    };

    const verifyUsernameExists = e => {
        verifyData(e.target.value).then(res => {
            if(res === null){
                setUsernameExists(false);
            }else{
                setUsernameExists(true);
                username.current.value = '';
            }
        }).catch(err => console.error(err));
    };

    return (
        <form method="POST" action="http://localhost:3001/accounts">
            <fieldset>
                <legend>Sign Up</legend>
                <p>Create an account to use for your purchases</p>
                <p>
                    <label htmlFor="name">Full Name*</label>
                    <input type="text" name="name" id="name" placeholder="Your name" required />
                </p>
                <p>
                    <label htmlFor="email">Email*</label>
                    <input type="email" name="email" id="email" placeholder="mail@website.com" required onBlur={verifyEmailExists} ref={email}/>
                    { emailExists ? <span ref={invalidEmail}>Email already exists.</span> : null }
                </p>
                <p>
                    <label htmlFor="password">Password*</label>
                    <input type="password" name="password" id="password" placeholder="Min. 8 character" required />
                </p>
                <p>
                    <label htmlFor="password">Confirm your password*</label>
                    <input type="password" name="passwordConfirm" id="passwordConfirm" placeholder="Min. 8 character" required />
                </p>
                <p>
                    <label htmlFor="username">Choose your username*</label>
                    <input type="text" name="username" id="username" placeholder="Min. 8 character" required onBlur={verifyUsernameExists} ref={username}/>
                    { usernameExists ? <span ref={invalidUsername}>Username already exists.</span> : null }
                </p>
                <p>
                    <button type="submit" name='login'>Sign Up</button>
                </p>
                <p>
                    Already have an account? <button id='signin' type="button" name='register' onClick={handleFormType}>Login In</button>
                </p>
            </fieldset>
        </form>
    );
};