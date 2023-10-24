import "./Landing.css"
import { Link } from "react-router-dom";
import Button from "../../components/Button.jsx";
import React from "react";
import Home from "../home/Home.jsx";

function Landing() {
    return (
      <div className="background-landing">
        <div className="landing-container">
            <h1 className="h1-landing">Welcome to Thailand WeatherApp!</h1>
            <p className="p1-landing">Login now to access all of our features</p>
              <form className="input-group-landing">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password"/>
                <Link to="/home"><Button className="login-btn" placeHolder="Login"/></Link>
              </form>
            <p className="p2-landing">Don&apos;t have an account yet?</p>
            <p className="p2-landing"><Link to="/register">Sign up now</Link></p>
        </div>
      </div>
    )
}

export default Landing;