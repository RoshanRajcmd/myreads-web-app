import React, { useState } from 'react';
import { redirect } from 'react-router-dom';

export function Login() {
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
    //const navigate = useNavigate();

    const handlePasswordVisibility = () => {
        setPassword({ ...password, showPassword: !password.showPassword })
    }

    const handlePassword = (enteredPassword) => {
        setPassword({ ...password, value: enteredPassword })
    }

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

    const handleEmail = (enteredEmail) => {
        if (!validateEmail(enteredEmail)) {
            setEmailValidationMsg("Please enter a valid email Id")
        }
        else {
            setEmail(enteredEmail.trim())
            setEmailValidationMsg('')
        }
        console.log(email)
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (handleConfirmPassword !== password) {
            setConfirmPasswordMsg("Missmatch in Password")
        }
        else {
            setConfirmPasswordMsg('')
        }
    }

    const handleLogin = () => {
        if (emailValidationMsg === "" && email !== "" && password.value !== "") {
            alert("Successful Login -> Redirecting...")
            redirect("/MyReads");
        } else {
            alert("Please enter a valid Email Id and Password")
        }
    }

    return (
        <>
            <h1>Hi Welcome to MyReads Web Application!</h1>
            <span style={{ marginRight: '20px' }}>Email Id</span>
            <input type="text" id='emailInput' onChange={(e) => handleEmail(e.target.value)} style={{ marginRight: '20px' }}></input>
            <span visible={emailValidationMsg !== '' ? true : false} style={{ color: 'red' }}>{emailValidationMsg}</span>
            <br />
            <span style={{ marginRight: '20px' }}>Password</span>
            <input type={password.showPassword ? 'text' : 'password'} onChange={(e) => handlePassword(e.target.value)} style={{ marginRight: '20px' }}></input>
            <button onClick={handlePasswordVisibility}>View Password</button>
            <br />
            <button onClick={handleLogin} style={{ marginTop: '10px' }}>Sign In</button>
            <br />
            <p>or Register using...</p>
            <button onClick={() => redirect("/MyReads/Register")} style={{ marginTop: '10px' }}>Sign Up</button>
        </>
    )
}