import "./NotFound.css"
import {Link} from "react-router-dom";

function NotFound() {
    return(
        <div>
            <main>
                <h2>Oeps... Deze pagina bestaat niet</h2>
                <p>Breng me terug naar de <Link to="/">Home pagina</Link></p>
            </main>
        </div>
    )
}

export default NotFound;