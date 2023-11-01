import "./Contact.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";
import {faAddressCard, faBuilding, faEnvelope, faPhone} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faFacebookMessenger} from '@fortawesome/free-brands-svg-icons'
function Contact() {

    return(
        <div>
            <NavBar/>
            <main className="contact-page">
                <h1>Contact</h1>
                <div className="contact-container">
                    <div>
                    <h3><i><FontAwesomeIcon icon={faBuilding} style={{color: "#ff5722",}} /></i> Address:</h3>
                        <h4>Thailand Weather B.V.</h4>
                        <h4>Wijst 93</h4>
                        <h4>5422BR Gemert</h4>
                        <h4>The Netherlands</h4>
                    </div>
                    <div>
                        <h3><i><FontAwesomeIcon icon={faAddressCard} style={{color: "#ff5722",}} /></i> Contact:</h3>
                        <h4><i><FontAwesomeIcon icon={faPhone} style={{color: "#ff5722",}} /></i> +31624728289</h4>
                        <h4><i><FontAwesomeIcon icon={faEnvelope} style={{color: "#ff5722",}} /></i> diegoocallegari@gmail.com</h4>
                        <h4><i><FontAwesomeIcon icon={faFacebook} style={{color: "#ff5722",}} /></i><a href="https://www.facebook.com/diego.callegari.7792/" target="_blank" rel="noreferrer">Facebook</a></h4>
                        <h4><i><FontAwesomeIcon icon={faFacebookMessenger} style={{color: "#ff5722",}} /></i><a href="https://m.me/diego.callegari.7792/" target="_blank" rel="noreferrer">Facebook Messenger</a></h4>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default Contact;