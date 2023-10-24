import "./Forecasts.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";
function Forecasts() {
    const [data, setData] = useState({})
    const [city, setCity] = useState("");
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=78bc08d8f3b87079b6ae5563af0efd2e`


    const searchLocation = (e) => {
        axios.get(url).then((response) => {
            setData(response.data)
            console.log(response.data)
        })
        setCity("")
    }

    return(
        <>
            <NavBar/>
            <main className="weather-forecast">
                <h1>Thailand Forecast</h1>
                <div className="container-forecast">
                    <div className="weather-input">
                        <h3>Enter City Name</h3>
                        <input className="city-input" type="text" placeholder="E.g., Bangkok, Chiang Mai, Phuket" value={city}
                               onChange={(e) => setCity(e.target.value)}/>
                        <button className="search-btn"  onClick={searchLocation}>Search</button>
                        <div className="separator"></div>
                        <Button className="location-btn" placeHolder="Use Current Location"/>
                    </div>
                    <div className="weather-data">
                        <div className="current-weather">
                            <div className="weather-details">
                                <h2>{data.name} (2023-10-23)</h2>
                                <h4>Temperature: {data.main.temp}°C</h4>
                                <h4>Wind: {} KM/H</h4>
                                <h4>Humidity: 49%</h4>
                                <h4>UV: 1</h4>
                                <h4>PM<sub>2.5</sub>: 46</h4>
                            </div>
                            <div className="icon-forecast">
                                <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                <h4>Moderate Rain</h4>
                            </div>
                        </div>
                        <div className="days-forecast">
                            <h2>5-Day Forecast</h2>
                            <ul className="weather-cards">
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 KM/H</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>UV: 1</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 KM/H</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>UV: 1</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 KM/H</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>UV: 1</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 KM/H</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>UV: 1</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 KM/H</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>UV: 1</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                            </ul>
                        </div>
                        <div className="space-creator">
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Forecasts;