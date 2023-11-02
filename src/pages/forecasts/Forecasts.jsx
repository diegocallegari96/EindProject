import "./Forecasts.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import WeatherCard from "../../components/WeatherCard/WeatherCard.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";

function Forecasts() {
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState("Bangkok");
    const [cityLocation, setCityLocation] = useState("")
    const [pollution, setPollution] = useState({});
    const [fiveWeather, setFiveWeather] = useState({})
    const [fivePollution, setFivePollution] = useState({})
    const [error, toggleError] = useState(false)
    const [errorLocation, toggleErrorLocation] = useState(false)
    const [message, setMessage] = useState('');
    const [loadingLocation, setLoadingLocation] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;


    // Setting standard location to Bangkok
    useEffect(() => {
        searchLocation();
    }, []);

    const searchLocation = async () => {
        try {
            toggleError(false);

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
            const fivePollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            const fivePollutionResponse = await axios.get(fivePollutionUrl);
            setFivePollution(fivePollutionResponse.data)
        } catch (error) {
            console.error("Error fetching data:", error);
            toggleError(true)
        }

        setCity("");
    };

    function myLocation() {
        toggleErrorLocation(false)
        setLoadingLocation(true)
        toggleError(false)
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                // Fetching city name by coordinates
                const cityNameUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${apiKey}`;
                axios.get(cityNameUrl)
                    .then((cityNameResponse) => {
                        setCityLocation(cityNameResponse.data)
                        const cityNameLocation = cityNameResponse.data[0].name;
                        setCity(cityNameLocation)
                        setLoadingLocation(false)

                    })
                    .catch((cityNameError) => {
                        console.error("Error fetching city name:", cityNameError);
                        toggleErrorLocation(true)
                        setLoadingLocation(false)

                    });

            }, (error) => {
                console.error('Error getting location:', error);
                setLoadingLocation(false)
            });
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }

    const baseUrl = 'https://frontend-educational-backend.herokuapp.com/api/';

    const markAsFavourite = async (weather) => {
        const accessToken = localStorage.getItem('accessToken');
        let currentFavourites = null;

        await getCurrentUserFavourites().then(response => {
            currentFavourites = response;
        })

        // If current favourites is not an array, make it one
        if (!Array.isArray(currentFavourites) && currentFavourites) {
            currentFavourites = [currentFavourites];
        }

        let data = [];
        // Merge current favourites with newly added favourite
        if (currentFavourites && currentFavourites.length > 0) {
            data = [
                weather,
                ...currentFavourites
            ];

        } else {
            data = [weather];
        }

        data = JSON.stringify(data);

        axios.put(
            baseUrl + 'user',
            {info: data},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        ).then(() => {
        }).catch((error) => {
            console.error(error);
        })
    }


    // Add to favourites message
    const handleClickFavourite = () => {
        markAsFavourite(weather);
        setMessage(`You added ${weather.name} to favourites`);
    };

    const handleNewCityReceived = (newCity) => {
        setMessage('');
        setCity(newCity)
    };

    const getCurrentUserFavourites = async () => {
        const accessToken = localStorage.getItem('accessToken');

        let results = null;

        await axios.get(
            baseUrl + 'user',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        ).then((response) => {
            if (response.data.info) {
                results = JSON.parse(response.data.info);
            }
        }).catch((error) => {
            console.error(error);
        })

        return results;
    }

    // UNIX to GMT
    function timeConverter() {
        const a = new Date(weather.dt * 1000);
        const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        let hour = a.getHours();
        const min = a.getMinutes();
        return date + '-' + month + '-' + year + ' ' + hour + ':' + min;
    }

    return (
        <>
            <NavBar/>
            <main className="weather-forecast">
                <h1>Thailand Forecast</h1>
                <div className="container-forecast">
                    <div className="weather-input">
                        <h3>Enter City Name</h3>
                        {loadingLocation && <span>Fetching your location</span>}
                        {error && <span>City not found or an error occurred. Please check the city name.</span>}
                        {errorLocation &&
                            <span>Something went wrong while trying to get your location. Please make sure that location services are enabled in your browser and try again.</span>}
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
                                       handleNewCityReceived()
                                   }
                               }}/>
                        <button
                            type="button"
                            className="search-btn"
                            onClick={() => {
                                searchLocation();
                                handleNewCityReceived();
                            }}>Search
                        </button>
                        <div className="separator"></div>
                        <button type="button"
                                className="location-btn"
                                onClick={() => {
                                    if (document.activeElement.tagName === 'INPUT') {
                                        myLocation();
                                    }
                                }}
                        >Use Current Location
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
                                        {pollution?.list[0] ?
                                            <h4>PM<sub>10</sub>: {pollution?.list[0]?.components.pm10} µg/m<sup>3</sup>
                                            </h4> : <h4>N/A</h4>}
                                        {pollution?.list[0] ?
                                            <h4>PM<sub>2.5</sub>: {pollution?.list[0]?.components.pm2_5} µg/m<sup>3</sup>
                                            </h4> : <h4>N/A</h4>}
                                        <p>
                                            <i style={{cursor: 'pointer'}} onClick={handleClickFavourite}>
                                                <FontAwesomeIcon icon={emptyStar} style={{color: '#ff5722'}}/> Add to
                                                Favourites
                                            </i>
                                        </p>
                                        <p>{message && <span>{message}</span>}</p>
                                    </>
                                )}
                            </div>
                            <div className="icon-forecast">
                                {weather.weather ?
                                    <img src={`https://openweathermap.org/img/wn/${weather.weather[0]?.icon}@2x.png`}
                                         alt="weather-icon"/> : <h4>N/A</h4>}
                                {weather.weather ? <h4>{weather.weather[0]?.description}</h4> : <h4>N/A</h4>}
                            </div>
                        </div>
                        <div className="days-forecast">
                            <h2>5-Day Forecast</h2>
                            {fiveWeather && fiveWeather.list && fivePollution && fivePollution.list && (
                                <ul className="weather-cards">
                                    <WeatherCard data={fiveWeather.list[0]} pollution={fivePollution.list[0]}/>
                                    <WeatherCard data={fiveWeather.list[8]} pollution={fivePollution.list[24]}/>
                                    <WeatherCard data={fiveWeather.list[16]} pollution={fivePollution.list[48]}/>
                                    <WeatherCard data={fiveWeather.list[24]} pollution={fivePollution.list[72]}/>
                                    <WeatherCard data={fiveWeather.list[32]} pollution={fivePollution.list[82]}/>
                                </ul>
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
