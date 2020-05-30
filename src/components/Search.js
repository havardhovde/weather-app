import React from 'react'
import InfoModal from './InfoModal'
import './Search.css'
import { AiOutlineSearch } from 'react-icons/ai'


const Search = (props) => {
    return(
        <div>
            <form id='search' onSubmit={props.getWeather}>
                <input id='search-bar' type='text' placeholder='City...' name='city'/>
                <button id='search-button'><AiOutlineSearch size={20} /></button>
            </form>
            <div id='info-button'>
                <InfoModal/>
            </div>
        </div>
    )
}

export default Search