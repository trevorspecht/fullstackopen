import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
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

const Country = ({ country, setClicked, setFiltered }) => {

  const clickHandler = (country) => {
    setClicked(true)
    console.log('clicked', country.name.common)
    setFiltered([country])
  }

  return (
    <div>
      <p>
        {country.name.common} 
        <button value={country} onClick={() => {clickHandler(country)}}>
          show
        </button>
      </p>
    </div>
  )
}

const Countries = ({ filtered, setFiltered, clicked, setClicked }) => {
  console.log('filtered', filtered.length, filtered)
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
        <Country 
          key={country.area} 
          country={country} 
          setClicked={setClicked} 
          setFiltered={setFiltered} 
        />)
    )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [clicked, setClicked] = useState(false)

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
  }

  return (
    <div>
      find countries <input value={filter} onChange={searchCountries} />
      <Countries 
        filtered={filtered} 
        setFiltered={setFiltered} 
        clicked={clicked} 
        setClicked={setClicked}
      />
    </div>
  );
}

export default App
