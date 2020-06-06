import React from 'react'

const Country = ({ country, weather }) => {
  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
  const weatherElement = weather ?
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} width={100} height={100} alt='weather icon'/>
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
    : <div />
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>{languages}</ul>
      <img src={country.flag} width="200" height="150" alt="country flag" />
      {weatherElement}
    </div>
  )
}

export default Country