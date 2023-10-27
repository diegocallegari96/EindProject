import "./Forecasts.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";


// country code optional not working yet.
// import { countries } from "i18n-iso-countries";
// console.log("US (Alpha-2) => " + countries.getName("US", "en"));

function Forecasts() {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("Bangkok");
    const [cityLocation, setCityLocation] = useState("")
    const [pollution, setPollution] = useState({});
    const [fiveWeather, setFiveWeather] = useState({})
    const [fivePollution, setFivePollution] = useState({})
    const apiKey = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        searchLocation();
    }, []);

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

            // Fetch 5-day weather data using coordinates
            const fiveWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            const fiveWeatherResponse = await axios.get(fiveWeatherUrl);
            setFiveWeather(fiveWeatherResponse.data);

            // Fetch 5-day pollution data using coordinates
            const fivePollutionUrl =`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const fivePollutionResponse = await axios.get(fivePollutionUrl);
            setFivePollution(fivePollutionResponse.data)
        } catch (error) {
            console.error("Error fetching data:", error);
        }

        setCity("");
    };

    // Get current location
    // problemen met tijdig locatie ophalen...
    function myLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetching city name by coordinates
                const cityNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;
                axios.get(cityNameUrl)
                    .then((cityNameResponse) => {
                        setCityLocation(cityNameResponse.data)
                        const cityNameLocation = cityLocation[0].name;
                        setCity(cityNameLocation)
                    })
                    .catch((cityNameError) => {
                        console.error("Error fetching city name:", cityNameError);
                    });

            }, (error) => {
                console.error('Error getting location:', error);
            });
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }


        // UNIX to GMT
    function timeConverter(){
        const a = new Date(weather.dt * 1000);
        const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        let hour = a.getHours();
        const min = a.getMinutes();
        return date + '-' + month + '-' + year + ' ' + hour + ':' + min;
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
                               onBlur={e => e.target.focus()}
                               onChange={(e) => setCity(e.target.value)}
                               onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                               e.preventDefault();
                               searchLocation();
                               myLocation()
                               }
                        }}/>
                        <button
                            type="button"
                            className="search-btn"
                            onClick={searchLocation}>Search
                        </button>
                        <div className="separator"></div>
                        <button type="button"
                                className="location-btn"
                                onClick={myLocation}>Use Current Location
                        </button>
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
                            {fiveWeather && fiveWeather.list && fivePollution && fivePollution.list && (
                            <>
                            <ul className="weather-cards">
                                <li className="card">
                                    <h3>(2023-10-26)</h3>
                                    {fiveWeather.list[0] ? <img src={`https://openweathermap.org/img/wn/${fiveWeather.list[0]?.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                    {fiveWeather.list[0] ? <h4>Temp: {fiveWeather.list[0].main.temp} °C</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[0] ? <h4>Wind: {fiveWeather.list[0].wind.speed} M/S</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[0] ? <h4>Humidity: {fiveWeather.list[0].main.humidity}%</h4> : <h4>N/A</h4>}
                                    {fivePollution.list[0] ? <h4>PM<sub>10</sub>: {fivePollution.list[0].components.pm10} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                    {fivePollution.list[0] ? <h4>PM<sub>2.5</sub>: {fivePollution.list[0].components.pm2_5} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                </li>
                                <li className="card">
                                    <h3>(2023-10-27)</h3>
                                    {fiveWeather.list[8]  ?<img src={`https://openweathermap.org/img/wn/${fiveWeather.list[8]?.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                    {fiveWeather.list[8] ? <h4>Temp: {fiveWeather.list[8].main.temp} °C</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[8] ? <h4>Wind: {fiveWeather.list[8].wind.speed} M/S</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[8] ? <h4>Humidity: {fiveWeather.list[8].main.humidity}%</h4> : <h4>N/A</h4>}
                                    {fivePollution.list[24] ? <h4>PM<sub>10</sub>: {fivePollution.list[24].components.pm10} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                    {fivePollution.list[24] ? <h4>PM<sub>2.5</sub>: {fivePollution.list[24].components.pm2_5} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}

                                </li>
                                <li className="card">
                                    <h3>(2023-10-28)</h3>
                                    {fiveWeather.list[16]  ?<img src={`https://openweathermap.org/img/wn/${fiveWeather.list[16]?.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                    {fiveWeather.list[16] ? <h4>Temp: {fiveWeather.list[16].main.temp} °C</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[16] ? <h4>Wind: {fiveWeather.list[16].wind.speed} M/S</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[16] ? <h4>Humidity: {fiveWeather.list[16].main.humidity}%</h4> : <h4>N/A</h4>}
                                    {fivePollution.list[48] ? <h4>PM<sub>10</sub>: {fivePollution.list[48].components.pm10} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                    {fivePollution.list[48] ? <h4>PM<sub>2.5</sub>: {fivePollution.list[48].components.pm2_5} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                </li>
                                <li className="card">
                                    <h3>(2023-10-29)</h3>
                                    {fiveWeather.list[24]  ?<img src={`https://openweathermap.org/img/wn/${fiveWeather.list[24]?.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                    {fiveWeather.list[24] ? <h4>Temp: {fiveWeather.list[24].main.temp} °C</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[24] ? <h4>Wind: {fiveWeather.list[24].wind.speed} M/S</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[24] ? <h4>Humidity: {fiveWeather.list[24].main.humidity}%</h4> : <h4>N/A</h4>}
                                    {fivePollution.list[72] ? <h4>PM<sub>10</sub>: {fivePollution.list[72].components.pm10} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                    {fivePollution.list[72] ? <h4>PM<sub>2.5</sub>: {fivePollution.list[72].components.pm2_5} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                </li>
                                <li className="card">
                                    <h3>(2023-10-30)</h3>
                                    {fiveWeather.list[32]  ?<img src={`https://openweathermap.org/img/wn/${fiveWeather.list[32]?.weather[0]?.icon}@2x.png`} alt="weather-icon"/> : <h4>N/A</h4>}
                                    {fiveWeather.list[32] ? <h4>Temp: {fiveWeather.list[32].main.temp} °C</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[32] ? <h4>Wind: {fiveWeather.list[32].wind.speed} M/S</h4> : <h4>N/A</h4>}
                                    {fiveWeather.list[32] ? <h4>Humidity: {fiveWeather.list[32].main.humidity}%</h4> : <h4>N/A</h4>}
                                    {fivePollution.list[82] ? <h4>PM<sub>10</sub>: {fivePollution.list[82].components.pm10} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                    {fivePollution.list[82] ? <h4>PM<sub>2.5</sub>: {fivePollution.list[82].components.pm2_5} µg/m<sup>3</sup></h4> : <h4>N/A</h4>}
                                </li>
                            </ul>
                            </>
                                )}
                            </div>
                        <div className="space-creator-forecast">
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Forecasts;
