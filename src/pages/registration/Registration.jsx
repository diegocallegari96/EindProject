import "./Registration.css"
import {Link} from "react-router-dom";
function Registration() {
    return(
        <div className="background-registration">
            <div className="registration-container">
                <h1 className="h1-registration">Sign up now</h1>
                <p className="p1-registration">Use all its features for free, forever!</p>
                  <form className="input-group-registration">
                    <input type="text" placeholder="First name" />
                    <input type="text" placeholder="Last name" />
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="register-button">Create account</button>
                  </form>
                <p className="p2-registration">Already have an account?</p>
                <p className="p2-registration"><Link to="/">Sign in now</Link></p>
            </div>
        </div>
    )
}

export default Registration;