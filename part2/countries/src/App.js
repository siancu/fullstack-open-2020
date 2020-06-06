import React, {useState, useEffect } from 'react';
import Country from './components/Country'
import ButtonWithCountry from './components/ButtonWithCountry'
import axios from 'axios'

function App() {
  // state
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  // effects
  useEffect(() => {
    const country = searchCountry.trim().toLowerCase()
    if (country.length !== 0) {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${country}`)
        .then((response) => {
          setCountries(response.data)
        })
        .catch(() => {})
    } else {
      setCountries([])
    }
  }, [searchCountry])

  // logic
  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value)
  }

  const handleButtonEvent = (country) => {
    const handler = () => {
      setCountries([country])
    }
    return handler;
  }

  let element = undefined
  
  if (countries.length === 0) {
    element = <div></div>
  } else if (countries.length === 1) {
    element = <Country country={countries[0]} />
  } else if (countries.length < 10) {
    const countryNames = countries.map(country => <ButtonWithCountry key={country.name} country={country} clickHandler={handleButtonEvent} />)
    element = <div>{countryNames}</div>
  } else {
    element = <p>Too many matches, specify another filter</p>
  }

  //render
  return (
    <div>
      <div>
        find countries
        <input value={searchCountry} onChange={handleSearchCountry} />
      </div>
      <div>
        {element}
      </div>
    </div>
  )
}

export default App;
