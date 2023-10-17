import "./Landing.css"

function Landing() {
    return (
      <div className="background">
        <div className="landing-container">
            <h1>Welcome to Thailand WeatherApp!</h1>
            <p className="p1">Login now to access all of our features</p>
            <div className="input-group">
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="login-button">Login</button>
            </div>
            <p className="p2">Don't have an account?</p>
            <button className="create-account-button">Create Account</button>
        </div>
      </div>
    )
}

export default Landing;