import "./Landing.css"
import {Link} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import { useAuthContext } from "../../context/AuthContext";
import Panel from "../../components/Panel/Panel";

function Landing() {

    const {user, setUser} = useAuthContext();

    const baseUrl = 'https://frontend-educational-backend.herokuapp.com/api/';

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [errors, setErrors] = useState("");

    const login = (e) => {
        e.preventDefault();

        axios.post(
            baseUrl + 'auth/signin',
            form,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then((response) => {
            // Save accessToken in LocalStorage
            const accessToken = response.data.accessToken;
            localStorage.setItem('accessToken', accessToken);

            setUser(response.data);

            window.location.href = '/forecasts';
        }).catch((error) => {
            console.error(error);
            setErrors("Invalid Username or Password");
        })
    }

    return (
        <Panel title="Welcome to Thailand WeatherApp!" text="Login now to access all of our features">
            {errors && <span className="error-message-signin">{errors}</span>}
            <form className="input-group-landing">
                <input type="text" placeholder="Username" onChange={(e) => setForm({
                    ...form,
                    username: e.target.value
                })}/>
                <input type="password" placeholder="Password" onChange={(e) => setForm({
                    ...form,
                    password: e.target.value
                })}/>
                <button className="login-button-landing" onClick={(e) => login(e)}>Login</button>
            </form>
            <p className="p2-landing">Don&apos;t have an account yet?</p>
            <p className="p2-landing"><Link to="/register">Sign up now</Link></p>
        </Panel>
    )
}

export default Landing;