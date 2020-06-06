import React from 'react'

const Country = ({ country }) => {
  const languages = country.languages.map(language => <li key={language.name}>{language.name}</li>)
  return (
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>{languages}</ul>
        <img src={country.flag} width="200" height="150" alt="country flag" />
      </div>
  )
}

export default Country