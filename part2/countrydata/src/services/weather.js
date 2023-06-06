import axios from 'axios'

const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'

// ?q=london&appid=b1bc183501dab26570a7d62aceabf5df'

const getWeather = (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY
    const request = axios.get(`${baseUrl}?q=${city}&units=metric&appid=${apiKey}`)
    return request.then(response => response.data)
}

const weatherService = { getWeather }

export default weatherService