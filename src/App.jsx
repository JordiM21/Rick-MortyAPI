import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import Location from './components/Location'
import ResidentInfo from './components/ResidentInfo'


function App() {
  const [location, setLocation] = useState({})
  const [idInput, setIdInput] = useState("")

  useEffect(() => {
    axios.get(`https://rickandmortyapi.com/api/location/1`)
      .then(res => setLocation(res.data))
  }, [])

  const getLocation = () =>{
    axios.get(`https://rickandmortyapi.com/api/location/${idInput}`)
      .then(res => setLocation(res.data))
  }
  //PAGINACION
  const [page, setPage] = useState(1)
  const lastIndex = page*6;
  const firstIndex = lastIndex - 6;
  const peoplePaginated = location.residents?.slice(firstIndex, lastIndex)
  const lastPage= Math.ceil(location.residents?.length/6);

  const numbers = [];
  for(let i = 1; i <=lastPage; i++){
    numbers.push(i);
  }


  //BUSCADOR
  //cada vez que cambie idInput por que es el estado que le dimos al value del input
  //para eso usamos el useffect y metemos idinput en dependencias
  const [locationSuggestion, setLocationSuggestion] = useState([]);
  useEffect(() => {
    // alert("cambio idinput")
    if(idInput !== ""){
      axios.get(`https://rickandmortyapi.com/api/location/?name=${idInput}`)
      .then(res => setLocationSuggestion(res.data.results))
    }else{
      setLocationSuggestion([]);
    }
  }, [idInput])


  return (
    <div className="App">
      <div className="hero-img input-group mb-3 mx-auto">
        <div className='hero-input d-flex'>
          <input
            value={idInput}
            onChange={e => setIdInput(e.target.value)}
            type="text" className="form-control"
            placeholder="Type a location name"
            aria-describedby="button-addon2" />
        </div>
      </div>
      {locationSuggestion.map(location => (
        <div className='searchContainer'>
            <a href='#' className='searchItem' onClick={() =>setLocation(location)}>{location.name}</a>
        </div>
          ))}
      <Location location={location} />
      <div className='pagination'>
          <button onClick={() => setPage(page-1)} disabled={page===1}>
            Previous
          </button>
          {numbers.map(number => (
            <button onClick={() =>setPage(number)}>{number}</button>
          ))}
          <button onClick={() => setPage(page+1)} disabled={page===lastPage}>
            Next
          </button>
      </div>
      <h4>Page: {page}</h4>
      <div className='row'>
          {peoplePaginated?.map(location => (
          <ResidentInfo location={location} key={location.url}/>
                ))}
      </div>
    </div>
  )
}

export default App
