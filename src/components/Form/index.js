import {useState} from 'react'
import './index.css'

const Form = () => {
  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)
  const [cities, setCities] = useState([])
  const [newCity, setNewCity] = useState('')
  const [duplicateCityError, setDuplicateCityError] = useState('')

  const fetchWeatherData = async cityName => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a15461c5210e968c1416041833573045&units=metric`,
      )
      if (!response.ok) {
        throw new Error('Invalid City Name')
      }
      const data = await response.json()
      setWeatherData(data)
      setCity('')
      setError(null)
    } catch (err) {
      setError('Invalid City Name')
      setCity('')
      setWeatherData(null)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetchWeatherData(city)
  }

  const addCity = () => {
    if (!cities.includes(newCity)) {
      setCities([...cities, newCity])
      setNewCity('') // Clear the input field after adding the city
      setDuplicateCityError('')
    } else {
      setNewCity('')
      setDuplicateCityError('City already exists')
    }
  }

  const removeCity = cityName => {
    setCities(cities.filter(c => c !== cityName))
  }

  return (
    <div className="bg-container">
      <h1 className="h1">Weather Application</h1>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
        {error && <p>{error}</p>}
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>Temperature: {weatherData.main.temp}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
          </div>
        )}
      </div>
      <div className="container1">
        <h2>City Management</h2>
        <input
          type="text"
          className="input"
          placeholder="Enter city name"
          value={newCity}
          onChange={e => setNewCity(e.target.value)}
        />
        <button type="button" className="button" onClick={addCity}>
          Add City
        </button>
        {duplicateCityError && <p className="error">*{duplicateCityError}</p>}

        <ul className="ul">
          {cities.map(c => (
            <li key={c} className="li">
              <p>{c}</p>
              <button
                className="button"
                type="button"
                onClick={() => removeCity(c)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Form
