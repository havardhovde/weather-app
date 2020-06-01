import React, { useState, useEffect } from 'react'
import './Weather.css'
import Moment from 'react-moment'
import { FaWind } from 'react-icons/fa'

const Weather = ({date, city, country, temperature, description, icon, windSpeed, windDirection, error}) => {
    const [windDir, setWindDir] = useState('')

    //Convert wind direction from degrees to text
    useEffect(() => {
        let degrees = windDirection

        let directions = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest']

        degrees = degrees * 8 / 360

        degrees = Math.round(degrees, 0)

        degrees = (degrees + 8) % 8

        setWindDir(directions[degrees])
      }, [windDirection])

    return (
        <main className='weather-card'>
            <div className='weather-content'>
                {city && country &&
                <h3 className='city-name'>
                     <p>{city}, {country}</p>
                </h3>
                }
                {date && description &&
                <div className='current-date-and-description'>
                     <p>{<Moment format='dddd MMMM Do YYYY, HH:mm'>{date*1000}</Moment>}</p>
                     <p>{description}</p>
                </div>
                }
                {error &&
                <div className='error'>
                     <p>{error}</p>
                </div>
                }
                {temperature && icon &&
                <div className='temperature-and-icon'>
                    <p className='temperature' style={{ color: temperature > 0 ? 'red' : 'blue' }}>{Math.round(temperature)} °C</p>
                    <img className='weather-icon' src={require(`../icons/${icon}.png`)} alt={description + ' icon'}/>
                </div>
                }
                {windSpeed &&
                <div className='wind-speed'>
                     <p>{Math.round(windSpeed) === 0 ? 'Calm winds' : `${Math.round(windSpeed)} m/s winds from the ${windDir}`} <FaWind /> </p>
                </div>
                }
            </div>
        </main>
    )
}

export default Weather