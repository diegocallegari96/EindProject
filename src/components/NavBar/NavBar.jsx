import "./NavBar.css"
import {NavLink} from "react-router-dom";
import logo from "../../assets/logo-eindproject.svg"
import {useState} from "react";
import { useAuthContext } from "../../context/AuthContext";

function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const {user, setUser} = useAuthContext();

    const logout = () => {
        setUser(null);

        localStorage.removeItem('accessToken');

        window.location.href = '/';
    };

    return (
        <nav className="navbar">
            <div className="logo-nav">
                <img src={logo} alt="Logo"/>
                <h2>Thailand Weather</h2>
            </div>

            <div
                className="menu-button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
            </div>

            <ul className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}>
                <li>
                    <NavLink to="/forecasts">Forecasts</NavLink>
                </li>
                <li>
                    <NavLink to="/maps">Maps</NavLink>
                </li>
                <li>
                    <NavLink to="/account">Favourites</NavLink>
                </li>
                <li>
                    <NavLink to="/contact">Contact</NavLink>
                </li>
                <li>
                    <a style={{cursor: 'pointer'}} onClick={() => logout()}>Log out</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;