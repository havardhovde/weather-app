import React from 'react'
import './Weather.css'
import Moment from 'react-moment'
import { FaWind } from 'react-icons/fa'

const Weather = ({date, city, country, temperature, description, icon, windSpeed, error}) => {

    return (
        <main className='weather-card'>
            <div className='weather-content'>
                <h3 className='city-name'>
                    {city && country && <p>{city}, {country}</p>}
                </h3>
                <div className='current-date-and-description'>
                    {date && description && <p>{<Moment format='DD/MM/YYYY'>{date*1000}</Moment>}, {description}</p>}
                </div>

                <div className='error'>
                    {error && <p>{error}</p>}
                </div>

                <div className='temperature-and-icon'>
                    {temperature && <p className='temperature' style={{ color: temperature > 0 ? 'red' : 'blue' }}>{Math.round(temperature)} °C</p>}
                    {icon && <img className='weather-icon' src={require(`../icons/${icon}.png`)} alt={description + ' icon'}/>}
                </div>
                <div className='wind-speed'>
                    {windSpeed && <p>Wind speed = {Math.round(windSpeed * 3.6)} km/h <FaWind/> </p>}
                </div>
            </div>
        </main>
    )
}

export default Weather