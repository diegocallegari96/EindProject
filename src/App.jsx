import './App.css'
import {Routes, Route} from "react-router-dom";

function App() {

    return (
    <>
      <div>

      </div>
      <div>
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
