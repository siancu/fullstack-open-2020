import React, {useState, useEffect } from 'react';
import Country from './components/Country'
import ButtonWithCountry from './components/ButtonWithCountry'
import axios from 'axios'

function App() {
  // state
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')
  const [weather, setWeather] = useState(undefined)

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

  useEffect(() => {
    if (countries.length === 1) {
      const params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: countries[0].capital,
        units: 'm'
      }

      axios.get('http://api.weatherstack.com/current', {params})
        .then(response => {
          setWeather(response.data)
        })
    }
  }, [countries])


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

  let element

  if (countries.length === 0) {
    element = <div></div>
  } else if (countries.length === 1) {
    element = <Country country={countries[0]} weather={weather} />
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
