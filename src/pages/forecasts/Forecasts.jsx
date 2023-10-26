import "./Forecasts.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Button from "../../components/Button.jsx";

function Forecasts() {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("");
    const [pollution, setPollution] = useState({});
    const [fiveWeather, setFiveWeather] = useState({})
    const apiKey = import.meta.env.VITE_API_KEY;


    const searchLocation = async () => {
        try {
            // Fetch weather data
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const weatherResponse = await axios.get(weatherUrl);
            const weatherData = weatherResponse.data;
            setWeather(weatherData);
            const lat = weatherData.coord.lat;
            const lon = weatherData.coord.lon;


            // Fetch pollution data using coordinates
            const pollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const pollutionResponse = await axios.get(pollutionUrl);
            setPollution(pollutionResponse.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setCity("");
    };
    // UNIX to GMT
    function timeConverter(){
        const a = new Date(weather.dt * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        let hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        // GMT TO GMT+7
        hour = (hour + 7) % 24;
        return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
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
                                <h2>{weather.name} ({timeConverter()})</h2>
                                {weather.main ? <h4>Temperature: {weather.main?.temp} °C</h4> : <h4>N/A</h4>}
                                {weather.main ? <h4>Feels like: {weather.main?.feels_like} °C</h4> : <h4>N/A</h4>}
                                {weather.wind ? <h4>Wind: {weather.wind?.speed} Meter/Sec</h4> : <h4>N/A</h4>}
                                {weather.main ? <h4>Humidity: {weather.main?.humidity}%</h4> : <h4>N/A</h4>}
                                {pollution && pollution.list && (
                                <>
                                {pollution?.list[0] ? <h4>PM<sub>10</sub>: {pollution?.list[0]?.components.pm10} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                {pollution?.list[0] ? <h4>PM<sub>2.5</sub>: {pollution?.list[0]?.components.pm2_5} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                </>
                                )}
                            </div>
                            <div className="icon-forecast">
                                {weather.weather ? <img src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                {weather.weather ? <h4>{weather.weather[0]?.description}</h4> : <h4>N/A</h4>}
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
