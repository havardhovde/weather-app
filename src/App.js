import React, { useState, useEffect }  from 'react';
import Search from './components/Search'
import Weather from './components/Weather'
import './App.css';

function App() {
  const [weather, setWeather] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()

  //Set latitude and longitude from geolocation, if avalible
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      })
    } else {
      console.log("Location not available");
    }
  }, [])

  //Weather at device position
  async function getWeatherFromPosition(lat, lon) {
    const apiResult = await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then( res => res.json())
    .then(data => data)
    .catch(err => {
    console.log(err)
    })
    if (apiResult.sys && lat) {
    setWeather({
        data: apiResult,
        date: apiResult.dt,
        city: apiResult.name,
        country: apiResult.sys.country,
        description: apiResult.weather[0].description,
        icon: apiResult.weather[0].icon,
        id: apiResult.weather[0].id,
        temperature: apiResult.main.temp,
        windSpeed: apiResult.wind.speed,
        windDirection: apiResult.wind.deg,
        error: ''
    })
    } else {
    setWeather({
        data: '',
        date: '',
        city: '',
        country: '',
        description: '',
        icon: '',
        id: '',
        temperature: '',
        windSpeed: '',
        windDirection: '',
        error: 'Waiting for location...'
    })
    }
  }

  //Set weather when location access granted
  useEffect(() => {
    getWeatherFromPosition(lat, lon)
  }, [lat, lon])

  //Weather at searched location
  async function getWeatherFromSearch(e) {
    const city = e.target.elements.city.value
    e.preventDefault()
  const apiResult = await fetch(`${process.env.REACT_APP_API_URL}/weather/?q=${city}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
    .then( res => res.json())
    .then(data => data)
    .catch(err => {
      console.log(err)
    })
    if (apiResult.sys && city) {
      setWeather({
        data: apiResult,
        date: apiResult.dt,
        city: apiResult.name,
        country: apiResult.sys.country,
        description: apiResult.weather[0].description,
        icon: apiResult.weather[0].icon,
        id: apiResult.weather[0].id,
        temperature: apiResult.main.temp,
        windSpeed: apiResult.wind.speed,
        windDirection: apiResult.wind.deg,
        error: '',
      })
    } else {
      setWeather({
        data: '',
        date: '',
        city: '',
        country: '',
        description: '',
        icon: '',
        id: '',
        temperature: '',
        windSpeed: '',
        windDirection: '',
        error: 'Invalid Location'
      })
    }
  }

  return (
    <div className="App">
      <h3>Current weather</h3>
      <div id='search-component'>
        <Search getWeather={getWeatherFromSearch} />
      </div>
      <Weather
        date={weather.date}
        city={weather.city}
        country={weather.country} 
        description={weather.description}
        id={weather.id}
        icon={weather.icon}
        temperature={weather.temperature} 
        windSpeed={weather.windSpeed}
        windDirection={weather.windDirection}
        error={weather.error} />
    </div>
  );
}

export default App;