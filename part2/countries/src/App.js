import React, {useState, useEffect } from 'react';
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

  let element = undefined
  
  if (countries.length === 0) {
    element = <div></div>
  } else if (countries.length === 1) {
    const country = countries[0]
    const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
    element = 
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img src={country.flag} width="200" height="150" alt="country flag" />
      </div>
  } else if (countries.length < 10) {
    const countryNames = countries.map(country => <li key={country.name}>{country.name}</li>)
    element = 
      <ul>
        {countryNames}
      </ul>
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
