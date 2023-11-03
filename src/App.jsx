import './App.css';
import {Routes, Route} from 'react-router-dom'; // Import Navigate for redirection
import Maps from './pages/maps/Maps.jsx';
import Landing from './pages/landing/Landing.jsx';
import Registration from './pages/registration/Registration.jsx';
import Favourites from './pages/favourites/Favourites.jsx';
import Forecasts from './pages/forecasts/Forecasts.jsx';
import Contact from './pages/contact/Contact.jsx';
import NotFound from './pages/notFound/NotFound.jsx';
import axios from 'axios';
import {useState, useEffect} from 'react';

function App() {
    const baseUrl = 'https://frontend-educational-backend.herokuapp.com/api/';
    const accessToken = localStorage.getItem('accessToken');
    const [authorized, setAuthorized] = useState(false);

    const validateToken = () => {
        if (accessToken) {
            axios
                .get(baseUrl + 'test/user', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + accessToken,
                    },
                })
                .then(() => {
                    setAuthorized(true);
                })
                .catch(() => {
                    setAuthorized(false);
                });
        } else {
            setAuthorized(false);
        }
    };

    useEffect(() => {
        validateToken();
    }, []); // Run once on component mount

    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Landing/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    {authorized && ( // Render the following routes only if authorized is true
                        <>
                            <Route path="/maps" element={<Maps/>}/>
                            <Route path="/account" element={<Favourites/>}/>
                            <Route path="/forecasts" element={<Forecasts/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                        </>
                    )}
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;