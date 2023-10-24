import "./Forecasts.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, { useState, useEffect } from "react";
function Forecasts() {

    return(
        <>
            <NavBar/>
            <main className="weather-forecast">
                <h1>Thailand Forecast</h1>
                <div className="container-forecast">
                    <div className="weather-input">
                        <h3>Enter City Name</h3>
                        <input type="text" placeholder="E.g., Bangkok, Chiang Mai, Phuket"/>
                        <button className="search-btn">Search</button>
                        <div className="separator"></div>
                        <button className="location-btn">Use Current Location</button>
                    </div>
                    <div className="weather-data">
                        <div className="current-weather">
                            <div className="weather-details">
                                <h2>Bangkok (2023-10-23)</h2>
                                <h4>Temperature: 29.3°C</h4>
                                <h4>Wind: 4.31 KM/H</h4>
                                <h4>Humidity: 49%</h4>
                                <h4>UV: 1</h4>
                            </div>
                            <div className="icon">
                                <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                <h4>Moderate Rain</h4>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Forecasts;