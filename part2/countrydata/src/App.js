import React, { useState, useEffect } from 'react'
import countriesService from './services/countries';
import FilteredCountries from './components/FilteredCountries';
import CountryData from './components/CountryData';
import weatherService from './services/weather';


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [country, setCountry] = useState(null)
  const [cityWeather, setCityWeather] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesService.getAllCountries().then(response => {
      setCountries(response)

    })
  }, [])
  console.log('render', countries.length, 'countries')

  const getCountry = (name) => {
    countriesService.getCountry(name).then(response => {
      setCountry(response) 
      getCountryWeather(response.capital[0])
      console.log(response)
    })
  }

  const getCountryWeather = (city) => {
    weatherService.getWeather(city).then(response => {
      setCityWeather(response)
      console.log(response)
    })
  }

  const searchForCountry = (name) => {
    setCountry(null)
    const searchedCountries = countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()))
    setFilteredCountries(searchedCountries)
  }

const onCountryChange = (event) => {
  setFilter(event.target.value)
  searchForCountry(event.target.value)
}

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={onCountryChange}/>
      </div>
      {/* if country is not null show CountryData else show FilteredCountries */}
      {country ? <CountryData country={country} countryWeather={cityWeather}/> : <FilteredCountries filteredCountries={filteredCountries} getCountry={getCountry}/>}
      
    </div>
  )
}

export default App;
