import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {
    const [email, setEmail] = useState('');
    const [emailValidationMsg, setEmailValidationMsg] = useState('');
    const [password, setPassword] = useState({ value: "", showPassword: false });
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
    const navigate = useNavigate();

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
    }

    const handleConfirmPassword = (comfirmationPassword) => {
        if (comfirmationPassword !== password.value) {
            setConfirmPasswordMsg("Missmatch in Password")
        }
        else {
            setConfirmPasswordMsg('')
        }
    }

    const handleRegister = () => {
        if (emailValidationMsg === "" && email !== "" && password.value !== "" && confirmPasswordMsg === "") {
            alert("Registeration Successful -> Redirecting...")
            navigate("/MyReads/Login");
        } else {
            alert("Please enter a valid Email Id and Password")
        }
    }

    return (
        <>
            <h1>Sign Up for MyReads </h1>
            <span style={{ marginRight: '20px' }}>Email Id</span>
            <input type="text" id='emailInput' onChange={(e) => handleEmail(e.target.value)} style={{ marginRight: '20px' }}></input>
            <span visible={emailValidationMsg !== '' ? true : false} style={{ color: 'red' }}>{emailValidationMsg}</span>
            <br />
            <h3>The password must contain:</h3>
            <ul>
                <li>minimum of 6 characters</li>
                <li>any special character</li>
                <li>must have atleast one number</li>
            </ul>
            <span style={{ marginRight: '20px' }}>Password</span>
            <input type={password.showPassword ? 'text' : 'password'} onChange={(e) => handlePassword(e.target.value)} style={{ marginRight: '20px' }}></input>
            <button onClick={handlePasswordVisibility}>View Password</button>
            <br />
            <span style={{ marginRight: '20px' }}>Confirm Password</span>
            <input type="password" id='passwordInput' onChange={(e) => handleConfirmPassword(e.target.value)} style={{ marginRight: '20px' }}></input>
            <span visible={confirmPasswordMsg !== '' ? true : false} style={{ color: 'red' }}>{confirmPasswordMsg}</span>
            <br />
            <button onClick={handleRegister} style={{ marginTop: '10px' }}>Register</button>
        </>
    )

}