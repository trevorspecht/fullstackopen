import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ name }) => {
  return (<p>{name}</p>)
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>subregion {country.subregion}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages)
          .map(language => 
          <li>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
    </div>
  )
}

const Countries = ({ filtered }) => {
  if (filtered.length > 10) 
    return (
      <p>Too many matches, specify another filter</p>
    )
  else if (filtered.length === 1)
    return (
      <CountryDetails country={filtered[0]} />
    )
  else
    return (
      filtered.map(country =>
      <Country name={country.name.common} />)
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
      })
  }, [])

  console.log('countries', countries)

  const searchCountries = (event) => {
    event.preventDefault()
    let value = event.target.value
    setFilter(value)
    setFiltered(countries.filter(country => country.name.common.includes(value)))
    console.log('filtered', filtered)
  }

  return (
    <div>
      find countries <input value={filter} onChange={searchCountries} />
      <Countries filtered={filtered} />
    </div>
  );
}

export default App
