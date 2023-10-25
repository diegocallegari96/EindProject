import "./Forecasts.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, { useState } from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";
function Forecasts() {
    const [data, setData] = useState({});
    const [city, setCity] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [pollution, setPollution] = useState({})
    const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_API_KEY}&units=metric`
    const urlPollution =`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_API_KEY}`

    const searchLocation = (e) => {
        axios.get(url).then((response) => {
            setData(response.data)
            setLat(response.data.coord.lat)
            setLon(response.data.coord.lon)
            console.log(response.data)
            console.log(response.data.coord.lat)
            console.log(response.data.coord.lon)
        })
        setCity("")
        axios.get(urlPollution).then((pollutionResponse) => {
            setPollution(pollutionResponse.pollution)
            console.log(pollutionResponse.pollution)
        }).catch((error) => {
            console.error(error);
        })
    }


    return(
        <>
            <NavBar/>
            <main className="weather-forecast">
                <h1>Thailand Forecast</h1>
                <div className="container-forecast">
                    <div className="weather-input">
                        <h3>Enter City Name</h3>
                        <input className="city-input"
                               type="text"
                               placeholder="E.g., Bangkok, Chiang Mai, Phuket"
                               value={city}
                               onChange={(e) => setCity(e.target.value)}
                               onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                               e.preventDefault();
                               searchLocation();
                               }
                        }}/>
                        <button
                            type="button"
                            className="search-btn"
                            onClick={searchLocation}>Search
                        </button>
                        <div className="separator"></div>
                        <Button className="location-btn" placeHolder="Use Current Location"/>
                    </div>
                    <div className="weather-data">
                        <div className="current-weather">
                            <div className="weather-details">
                                <h2>{data.name} (2023-10-23)</h2>
                                {data.main ? <h4>Temperature: {data.main?.temp} °C</h4> : <h4>N/A</h4>}
                                {data.main ? <h4>Feels like: {data.main?.feels_like} °C</h4> : <h4>N/A</h4>}
                                {data.wind ? <h4>Wind: {data.wind?.speed} Meter/Sec</h4> : <h4>N/A</h4>}
                                {data.main ? <h4>Humidity: {data.main?.humidity}%</h4> : <h4>N/A</h4>}
                                <h4>PM<sub>2.5</sub>: 46</h4>
                            </div>
                            <div className="icon-forecast">
                                {data.weather ? <img src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                {data.weather ? <h4>{data.weather[0]?.description}</h4> : <h4>N/A</h4>}
                            </div>
                        </div>
                        <div className="days-forecast">
                            <h2>5-Day Forecast</h2>
                            <ul className="weather-cards">
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 M/S</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 M/S</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 M/S</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 M/S</h4>
                                    <h4>Humidity: 49%</h4>
                                    <h4>PM<sub>2.5</sub>: 46</h4>
                                </li>
                                <li className="card">
                                    <h3>(2023-10-23)</h3>
                                    <img src="https://openweathermap.org/img/wn/11n@2x.png" alt="weather-icon"/>
                                    <h4>Temp: 29.3°C</h4>
                                    <h4>Wind: 4.31 M/S</h4>
                                    <h4>Humidity: 49%</h4>
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