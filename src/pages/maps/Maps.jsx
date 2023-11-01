import "./Maps.css"
import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx"
import WeatherMap from "../../components/WeatherMap/weatherMap.jsx";

function Maps() {
    const apiKey = import.meta.env.VITE_API_KEY;
    return(

        <div>
            <NavBar/>
            <div className="container-home">
                <>
                    <h1 className="header-maps">Maps</h1>
                    <div className="maps-container">
                        <WeatherMap
                            mapType="TA2"
                            apiKey={apiKey}
                            title="Temperature"
                        />
                        <WeatherMap
                            mapType="WND"
                            apiKey={apiKey}
                            title="Wind Speed"
                        />
                        <WeatherMap
                            mapType="CL"
                            apiKey={apiKey}
                            title="Clouds"
                        />
                        <WeatherMap
                            mapType="PR0"
                            apiKey={apiKey}
                            title="Precipitation"
                        />
                    </div>
                </>
            </div>
            <div className="space-creator-home"></div>
            <Footer/>
        </div>

    )
}

export default Maps;