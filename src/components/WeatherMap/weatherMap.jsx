import React from 'react';

const WeatherMap = ({mapType, apiKey, title, imageSrc}) => {
    return (
        <div className='image-container-maps'>
            <h2>{title}:</h2>
            <img
                className="weather-map"
                src={`https://maps.openweathermap.org/maps/2.0/weather/${mapType}/4/12/7?appid=${apiKey}&use_norm=true&arrow_step=16`}
                alt={`${title} Map`}
            />
            <span className="copyright-maps">
        <a href="https://openweathermap.org/" target="_blank" rel="noreferrer">
          OpenWeather </a> &copy; All rights reserved
      </span>
        </div>
    );
};

export default WeatherMap;
