import './App.css'
import {Routes, Route} from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Landing from "./pages/landing/Landing.jsx";
import Registration from "./pages/registration/Registration.jsx";
import Maps from "./pages/maps/Maps.jsx";
import Forecasts from "./pages/forecasts/Forecasts.jsx";
import Contact from "./pages/contact/Contact.jsx";
import NotFound from "./pages/notFound/NotFound.jsx";


function App() {
    return (
    <>
      <div className="App">
          <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/register" element={<Registration/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/maps" element={<Maps/>}/>
              <Route path="/forecasts" element={<Forecasts/>}/>
              <Route path="/contact" element={<Contact/>}/>
              <Route path="*" element={<NotFound/>}/>
          </Routes>
      </div>

    </>
  )
}

export default App
