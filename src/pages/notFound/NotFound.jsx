import "./NotFound.css"
import {Link} from "react-router-dom";

function NotFound() {
    return(
        <div className="div-not-found">
            <main>
                <h2>Oops... It seems this page doesn&apos;t exist.</h2>
                <p>Bring me back to the <Link to="/">Landing page</Link></p>
            </main>
        </div>
    )
}

export default NotFound;