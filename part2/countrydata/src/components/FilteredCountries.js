const FilteredCountries = ({filteredCountries, getCountry}) => {
return (
  <div>
        {
        filteredCountries.length > 10 ? 
        <p>Too many matches, specify another filter</p>
        : filteredCountries.length === 1 ?
        filteredCountries.map(
          country =>
           <div key={country.name.official}>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital}</p>
            <p>area {country.area}</p>
            <h2>languages</h2>
            <ul>
              {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
            </ul>
            <img src={country.flags.png} alt="flag" width="200" height="100"/>
          </div>
        )
        : filteredCountries.map(country => <p key={country.name.official}>{country.name.common}
        <button onClick={()=>getCountry(country.name.common)} >
          show
          </button> 
          </p>)
        
      
}
  </div>
)
}

export default FilteredCountries