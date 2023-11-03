import "./NavBar.css"
import {NavLink} from "react-router-dom";
import logo from "../../assets/logo-eindproject.svg"
import {useState} from "react";

function NavBar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            </ul>
        </nav>
    );
}

export default NavBar;