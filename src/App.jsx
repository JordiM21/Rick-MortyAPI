import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Location from './components/Location'
import ResidentInfo from './components/ResidentInfo'


function App() {
  const [location, setLocation] = useState({})
  const [idInput, setIdInput] = useState("")

  const random = Math.floor(Math.random() * 126) + 1;
  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/${random}`)
      .then(res => setLocation(res.data))
  }, [])

  const getLocation = () =>{
    axios.get(`https://rickandmortyapi.com/api/location/${idInput}`)
      .then(res => setLocation(res.data))
  }

  return (
    <div className="App">
      <div className="hero-img input-group mb-3 mx-auto">
        <div className='hero-input d-flex'>
          <input
            value={idInput}
            onChange={e => setIdInput(e.target.value)}
            type="number" className="form-control"
            placeholder="Type a Location id"
            aria-describedby="button-addon2" />
          <button onClick={() => getLocation()}
            className="btn btn-outline-success"
            type="button" id="button-addon2">
            Find
          </button>
        </div>
      </div>
      <Location location={location} />
      <div className='row'>
          {location.residents?.map(location => (
          <ResidentInfo location={location} key={location.url}/>
                ))}
      </div>
    </div>
  )
}

export default App
