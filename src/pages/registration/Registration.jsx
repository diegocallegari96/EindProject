import "./Registration.css"
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {useAuthContext} from "../../context/AuthContext";
import Panel from "../../components/Panel/Panel";
import Button from "../../components/Button/Button.jsx";


function Registration() {

    const {user, setUser} = useAuthContext();

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

            setUser(response.data);
            
            // Save accessToken in LocalStorage
            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', accessToken);

            window.location.href = '/forecasts';
        }).catch((error) => {
            console.error(error);
        })
    }


    return (
        <Panel title="Sign up now" text="Use all its features for free, forever!">
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
                <Button className="registration-button" onClick={(e) => submit(e)} label="Create Account"/>
            </form>
            <p className="p2-registration">Already have an account?</p>
            <p className="p2-registration"><Link to="/">Sign in now</Link></p>
        </Panel>
    )
}

export default Registration;