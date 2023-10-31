import "./weatherMap.css"
import {Link} from "react-router-dom";
const WeatherMap = () => {
    const apiKey = import.meta.env.VITE_API_KEY;

    return (
        <>
            <h1 className="header-maps">Maps</h1>
            <div className="maps-container">
                <div className='image-container-maps'>
                    <h2>Temperature:</h2>
                    <img className="weather-map"
                    src={`https://maps.openweathermap.org/maps/2.0/weather/TA2/4/12/7?appid=${apiKey}&fill_bound=true&opacity=0.6
                    &palette=-65:821692;-55:821692;-45:821692;-40:821692;-30:8257db;-20:208cec;-10:20c4e8;0:23dddd;10:c2ff28;20:fff028;25:ffc228;30:fc8014`}
                    alt="Temperature Map"
                    />
                    <span className="copyright-maps"><a href="https://openweathermap.org/" target="_blank">OpenWeather</a> &copy; All rights reserved</span>
                </div>
                <div className='image-container-maps'>
                    <h2>Wind Speed:</h2>
                    <img className="weather-map"
                         src={`https://maps.openweathermap.org/maps/2.0/weather/WND/4/12/7?appid=${apiKey}&use_norm=true&arrow_step=16`}
                         alt="Wind Speed Map"
                    />
                    <span className="copyright-maps"><a href="https://openweathermap.org/" target="_blank">OpenWeather</a> &copy; All rights reserved</span>
                </div>
                <div className='image-container-maps'>
                    <h2>Clouds:</h2>
                    <img className="weather-map"
                         src={`https://maps.openweathermap.org/maps/2.0/weather/CL/4/12/7?appid=${apiKey}`}
                         alt="Cloud Map"
                    />
                    <span className="copyright-maps"><a href="https://openweathermap.org/" target="_blank">OpenWeather</a> &copy; All rights reserved</span>
                </div>
                <div className='image-container-maps'>
                    <h2>Precipitation:</h2>
                    <img className="weather-map"
                         src={`https://maps.openweathermap.org/maps/2.0/weather/PR0/4/12/7?appid=${apiKey}`}
                         alt="Precipitation Map"
                    />
                    <span className="copyright-maps"><a href="https://openweathermap.org/" target="_blank">OpenWeather</a> &copy; All rights reserved</span>
                </div>
            </div>
        </>

    );
}

export default WeatherMap

