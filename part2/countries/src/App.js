import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState({
    current: {
      weather: [{
        description: 'loading weather data...'
      }],
      temp: 'loading weather data...'
    }
  })

  const lat = country.latlng[0]
  const lon = country.latlng[1]

  useEffect(() => {
    axios 
      .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        setWeather(res.data)
      })
  }, [lat, lon])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>population {country.population}</p>
      <h3>Spoken languages</h3>
      <ul>
        {Object.values(country.languages)
          .map((language, index) => 
          <li key={index}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.name.common} />
      <h3>Weather in {country.capital}</h3>
      <p>{weather.current.weather[0].description}</p>
      <p>temperature: {weather.current.temp} Celcius</p>
    </div>
  )
}

const Country = ({ country, setFiltered }) => {

  const clickHandler = (country) => setFiltered([country])

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

const Countries = ({ filtered, setFiltered }) => {
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
          setFiltered={setFiltered} 
        />)
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
  }

  return (
    <div>
      find countries <input value={filter} onChange={searchCountries} />
      <Countries 
        filtered={filtered} 
        setFiltered={setFiltered} 
      />
    </div>
  );
}

export default App
