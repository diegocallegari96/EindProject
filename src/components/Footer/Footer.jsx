import React from 'react';
import "./Footer.css"

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer>
            <div className="container">
                <p>&copy; {currentYear} Diego Callegari. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;