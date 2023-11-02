import "./Registration.css"
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";

function Registration() {

    const baseUrl = 'https://frontend-educational-backend.herokuapp.com/api/';

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        role: "user"
    });

    const [errors, setErrors] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');

    const submit = (e) => {
        e.preventDefault();

        if (form.password !== confirmPassword) {
            setErrors('Passwords do not match.');
            return;
        }

        if (form.username.length < 6) {
            setErrors('Username must be at least 6 characters.');
            return;
        }

        if (form.password.length < 6) {
            setErrors('Password must be at least 6 characters.');
            return;
        }

        if (!form.email.includes('@')) {
            setErrors('Invalid email address.');
            return;
        }


        axios.post(
            baseUrl + 'auth/signup',
            form,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then((response) => {
            login();
        }).catch((error) => {
            console.error(error);
            setErrors(error.response.data.message);
        })
    }

    const login = () => {
        const data = {
            username: form.username,
            password: form.password,
        };

        axios.post(
            baseUrl + 'auth/signin',
            data,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then((response) => {

            // Save accessToken in LocalStorage
            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', accessToken);

            window.location.href = '/forecasts';
        }).catch((error) => {
            console.error(error);
        })
    }


    return (
        <div className="background-registration">
            <div className="registration-container">
                <h1 className="h1-registration">Sign up now</h1>
                <p className="p1-registration">Use all its features for free, forever!</p>
                {errors && <span className="error-message-signup">{errors}</span>}
                <form className="input-group-registration">
                    <input type="text" placeholder="Username" onChange={(e) => setForm({
                        ...form,
                        username: e.target.value
                    })}/>
                    <input type="text" placeholder="Email" onChange={(e) => setForm({
                        ...form,
                        email: e.target.value
                    })}/>
                    <input type="password" placeholder="Password" onChange={(e) => setForm({
                        ...form,
                        password: e.target.value
                    })}/>
                    <input type="password" placeholder="Confirm password"
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <button className="registration-button" onClick={(e) => submit(e)}>Create Account</button>
                </form>
                <p className="p2-registration">Already have an account?</p>
                <p className="p2-registration"><Link to="/">Sign in now</Link></p>
            </div>
        </div>
    )
}

export default Registration;