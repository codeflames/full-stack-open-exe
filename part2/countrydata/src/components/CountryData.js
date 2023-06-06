const Weather = ({ weather }) => {
  if (!weather) {
    return null
  }
  return(
    <div>
      <h2>Weather in {weather.name}</h2>
      <p><b>temperature:</b> {weather.main.temp} Celsius</p>
      <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon" width="100" height="100" />
      <p><b>wind:</b> {weather.wind.speed} m/s</p>
    </div>
  )
}

const CountryData = ({ country, countryWeather }) => {
  if (!country) {
    return null
  }
  return(
    <div key={country.name.official}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages</h2>
            <ul>
              {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" width="200" height="100"/>
            <Weather weather={countryWeather}/>
          </div>

    )
}

export default CountryData