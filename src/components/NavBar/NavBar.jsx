import "./NavBar.css"
import { NavLink } from "react-router-dom";

function NavBar() {
    return(
        <nav>
            <ul>
                <li><NavLink></NavLink></li>
                <li><NavLink></NavLink></li>
                <li><NavLink></NavLink></li>
                <li><NavLink></NavLink></li>
            </ul>
        </nav>
    )
}