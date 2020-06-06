import React from 'react'

const ButtonWithCountry = ({ country, clickHandler }) => {
  return (
    <div>
      {country.name}&nbsp;<button onClick={clickHandler(country)}>show</button>
    </div>
  )
}

export default ButtonWithCountry