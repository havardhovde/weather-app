import React from 'react'

const Search = (props) => {
    return(
        <form onSubmit={props.getWeather}>
            <input type='text' placeholder='city' name='city'/>
            <button>Submit</button>
        </form>
    )
}

export default Search