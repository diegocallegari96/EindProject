import "./Account.css"
import NavBar from "../../components/NavBar/NavBar.jsx";
import Footer from "../../components/Footer/Footer.jsx";


function Account() {

    return(
        <div>
            <NavBar/>
            <main className="account-page">
                <h1>Account</h1>
            </main>
            <Footer/>
        </div>
    )
}

export default Account;