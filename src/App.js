import React, { useState, useEffect }  from 'react';
import Search from './components/Search'
import Weather from './components/Weather'
import './App.css';

function App() {
  const [weather, setWeather] = useState([])
  const [lat, setLat] = useState()
  const [lon, setLon] = useState()

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude)
        setLon(position.coords.longitude)
      })
    } else {
      console.log("Not Available");
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
        error: 'Waiting for location...'
    })
    }
    console.log(apiResult)
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
        error: 'Invalid Location'
      })
    }
    console.log(apiResult)
  }

  return (
    <div className="App">
      <h3>Weather app</h3>
      <Search getWeather={getWeatherFromSearch} />
      <Weather
        date={weather.date}
        city={weather.city}
        country={weather.country} 
        description={weather.description}
        id={weather.id}
        icon={weather.icon}
        temperature={weather.temperature} 
        windSpeed={weather.windSpeed} 
        error={weather.error} />
    </div>
  );
}

export default App;