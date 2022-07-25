import React, {useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import {selectTheme} from '../features/theme/themeSlice'
import { toggleTheme } from "../features/theme/themeSlice"
import {Helmet} from 'react-helmet'
import { useNavigate } from "react-router-dom"
import { getPosts } from "../features/posts/postsSlice"
import { lightTheme, darkTheme } from "./themes"

export const TopBanner = () => {

    // console.log('Component TopBanner starting to render')


    const [searchTerm, setSearchTerm] = useState('')

    const theme = useSelector(selectTheme)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    function handleOnClickTheme () {
        dispatch(toggleTheme())
    } 
    
    function handleOnChange (e) {
        setSearchTerm(e.target.value)
    }
    
    function handleSubmit (event) {
        event.preventDefault();
        const query = searchTerm.replaceAll(' ','%20')
        navigate(`search/?q=${query}`)
        dispatch(getPosts(`https://www.reddit.com/search.json?q=${query}`))
    } 

    // const darkButton = {
    //     backgroundColor: 'black', 
    //     color: 'white'
    // }

    // const lightButton = {
    //     backgroundColor: 'white', 
    //     color: 'black'
    // }

    const darkSearBar = {
        backgroundColor: '#424242', 
        color: 'white',
    }

    const lightSearBar = {
        backgroundColor: 'white', 
        color: 'black',
    }



    return (
        <div className="topBanner">
            <img className="Reddit-logo" src={require("../images/redditLogo.png")} alt=''/>
            <form onSubmit={handleSubmit} className='form'>
            <input type='text' placeholder='search' className="search-box" onChange={handleOnChange} style={theme==='light'?lightSearBar:darkSearBar}/>
                <button className="search-button">Search</button>
            </form>
            <button onClick={handleOnClickTheme} className="theme-button" style={theme==='light'?darkTheme:lightTheme}>{theme==='light'?'dark':'light'}</button>
            <Helmet>
                <style>{`body { background-color: ${theme==='light'?'#DAE0E6':'#030303'}; }`}</style>
            </Helmet>
        </div>
    )

}

