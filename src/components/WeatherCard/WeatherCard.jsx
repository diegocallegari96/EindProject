import React from 'react';

const WeatherCard = ({data, pollution}) => {
    return (
        <li className="card">
            {data ? (
                <>
                    <h3>{data.dt_txt.split(" ")[0].split('-').reverse().join('-')}</h3>
                    <img src={`https://openweathermap.org/img/wn/${data.weather[0]?.icon}@2x.png`} alt="weather-icon"/>
                    <h4>Temp: {data.main.temp} °C</h4>
                    <h4>Wind: {data.wind.speed} M/S</h4>
                    <h4>Humidity: {data.main.humidity}%</h4>
                </>
            ) : (
                <h3>N/A</h3>
            )}
            {pollution ? (
                <>
                    <h4>PM<sub>10</sub>: {pollution.components.pm10} µg/m<sup>3</sup></h4>
                    <h4>PM<sub>2.5</sub>: {pollution.components.pm2_5} µg/m<sup>3</sup></h4>
                </>
            ) : (
                <h4>N/A</h4>
            )}
        </li>
    );
};

export default WeatherCard;