import "./weatherMap.css"
const WeatherMap = () => {
    return (
        <>
            <h1 className="header-maps">Maps</h1>
            <div className="maps-container">
                <div className='image-container-maps'>
                    <h2>Temperature:</h2>
                    <img className="weather-map"
                    src="https://tile.openweathermap.org/map/temp_new/4/12/7.png?appid=78bc08d8f3b87079b6ae5563af0efd2e"
                    alt="Temperature Map"
                    />
                    <span className="copyright-maps">OpenWeather &copy; All rights reserved</span>
                </div>
                <div className='image-container-maps'>
                    <h2>Wind Speed:</h2>
                    <img className="weather-map"
                         src="https://tile.openweathermap.org/map/wind_new/4/12/7.png?appid=78bc08d8f3b87079b6ae5563af0efd2e"
                         alt="Temperature Map"
                    />
                    <span className="copyright-maps">OpenWeather &copy; All rights reserved</span>
                </div>
                <div className='image-container-maps'>
                    <h2>Clouds:</h2>
                    <img className="weather-map"
                         src="https://tile.openweathermap.org/map/clouds_new/4/12/7.png?appid=78bc08d8f3b87079b6ae5563af0efd2e"
                         alt="Temperature Map"
                    />
                    <span className="copyright-maps">OpenWeather &copy; All rights reserved</span>
                </div>
                <div className='image-container-maps'>
                    <h2>Precipitation:</h2>
                    <img className="weather-map"
                         src="https://tile.openweathermap.org/map/precipitation_new/4/12/7.png?appid=78bc08d8f3b87079b6ae5563af0efd2e"
                         alt="Temperature Map"
                    />
                    <span className="copyright-maps">OpenWeather &copy; All rights reserved</span>
                </div>
            </div>
        </>

    );
}

export default WeatherMap

