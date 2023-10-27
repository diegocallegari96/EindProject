import "./Maps.css"
import React from "react";
import Footer from "../../components/Footer/Footer.jsx";
import NavBar from "../../components/NavBar/NavBar.jsx"
import WeatherMap from "../../components/WeatherMap/weatherMap.jsx";

function Maps() {
    return(
        <div>
            <NavBar/>
            <div className="container-home">
            <WeatherMap/>
            </div>
            <div className="space-creator-home"></div>
            <Footer/>
        </div>

    )
}

export default Maps;