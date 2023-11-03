import "./Favourites.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-solid-svg-icons";

function Favourites() {

    useEffect(() => {
        getFavourites();
    }, []);

    const [favourites, setFavourites] = useState([]);

    const baseUrl = 'https://frontend-educational-backend.herokuapp.com/api/';
    const accessToken = localStorage.getItem('accessToken');

    const getFavourites = () => {
        axios.get(
            baseUrl + 'user',
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        ).then((response) => {
            const favouriteWeather = JSON.parse(response.data.info);
            console.log(favouriteWeather);
            setFavourites(favouriteWeather); // dit moet een array worden
        }).catch((error) => {
            console.error(error);
        })
    }

    const markAsUnfavourite = async (weather) => {
        const accessToken = localStorage.getItem('accessToken');
        let currentFavourites = null;

        await getCurrentUserFavourites().then(response => {
            currentFavourites = response;
        });

        // Find weather in current favourites
        const index = currentFavourites.findIndex(favourite => favourite.name === weather.name);

        // Check if weather is found
        if (index !== -1) {
            // Remove the item at the found index
            currentFavourites.splice(index, 1);
        }

        axios.put(
            baseUrl + 'user',
            {info: JSON.stringify(currentFavourites)},
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + accessToken
                }
            }
        ).then((response) => {
            console.log(response.data.info);
            setFavourites(JSON.parse(response.data.info));
        }).catch((error) => {
            console.error(error);
        })
    }

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
            results = JSON.parse(response.data.info);
        }).catch((error) => {
            console.error(error);
        })

        return results;
    }
    console.log(favourites)
    return (
        <div>
            <NavBar/>
            <main className="favourites-page">
                <h1>Favourites</h1>
                <div className='favourites-container'>
                    {favourites &&
                        favourites.length > 0 &&
                        favourites.map((favourite => (
                            <li key={favourite.name} className="card">
                                <h3>{favourite?.name}</h3>
                                <img src={`https://openweathermap.org/img/wn/${favourite?.weather[0].icon}@2x.png`}
                                     alt="weather-icon"/>
                                <h4>Temp: {favourite?.main.temp} °C</h4>
                                <h4>Feels like: {favourite?.main.feels_like} °C</h4>
                                <h4>Wind: {favourite?.wind.speed} M/S</h4>
                                <h4>Humidity: {favourite?.main.humidity}%</h4>
                                <p style={{cursor: 'pointer'}} onClick={() => markAsUnfavourite(favourite)}>
                                    <i><FontAwesomeIcon icon={faStar} style={{color: "#ff5722",}}/></i> Remove</p>
                            </li>
                        )))
                    }
                </div>
                <div className="space-creator-favourites">
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Favourites;