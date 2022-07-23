import React, {useEffect, useState} from "react"
import { useDispatch, useSelector} from "react-redux"
import { useNavigate, NavLink, useLocation,useSearchParams } from 'react-router-dom'
import { getPosts } from "../features/posts/postsSlice"
import { selectTheme } from "../features/theme/themeSlice"
import { lightTheme, darkTheme } from "./themes"

export const Filters = () => {

    // console.log('Component Filters starting to render')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const theme = useSelector(selectTheme)
    const pathname = useLocation().pathname
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('t');


    useEffect(() => {
        if (pathname === '/') {navigate('/hot/')}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    const[topFilter, setTopFilter] = useState('Today')
    const timeframes = ['Now','Today','This Week', 'This Month', 'This Year', 'All Time']

    const style = ({ isActive }) => ({
        filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
        backgroundColor: theme==='light'?'#F6F7F8':'#1A1A1A',
        color: theme==='light'?'black':'white'
    });

    function handleChange (event) {
        setTopFilter(event.target.value)
        let timeframe = ''
        switch (event.target.value) {
            case 'Now':
                 timeframe = '?t=hour'
                 break
            case 'Today':
                timeframe = '?t=day'
                break
            case 'This Week':
                timeframe = '?t=week'
                break
            case 'This Month':
                timeframe = '?t=month'
                break
            case 'This Year':
                timeframe = '?t=year'
                break
            case 'All Time':
                timeframe = '?t=all'
                break
            default:
                timeframe = '?t=day'
        }
        const newPath = `${pathname.substring(0,pathname.lastIndexOf('/'))}/${timeframe}`
        navigate(newPath)
    }

    function getJsonUrl (firstFilter, secondFilter) {
        firstFilter = firstFilter.replace('/','')
        // console.log('getJsonUrl function called with: ' + firstFilter + ' and ' + secondFilter)
        if (firstFilter.includes('new') || firstFilter.includes('rising')) {
            return `https://www.reddit.com/${firstFilter}.json`
        } else if (firstFilter.includes('top')) {
            return `https://www.reddit.com/top.json?t=${secondFilter}`
        } else {              // If firstFilter === hot, or no match.
            return 'https://www.reddit.com/r/Popular.json?geo_filter=GLOBAL'
        }
    }

    //The dispactch is wrapped in this useEffect to avoid Posts rendering at the same time as this component. UseEffect delays the dispatch until this Filter component is done rendering.
    useEffect(() => {
        //Sends action to getPosts whenever url matches HOT, NEW or RISING, with no second parameter.
        let secondParameter = pathname.substring(pathname.indexOf('/',1)+1,pathname.length)
        if (pathname.includes('search') === false){
            if (secondParameter.includes('?t=') || secondParameter === '' || secondParameter === '/') {
                dispatch(getPosts(getJsonUrl(pathname, searchTerm)))
            }
        }
    })

    return (
        <div className="Filters-component">
            <div className="frame" style={theme==='light'?lightTheme:darkTheme}>
                <NavLink to={'/hot/'} style={style} >
                    <div className='filter-button hot'  >
                        <img src={require('../images/hot2.png')} className='filter' alt=""/>
                    </div>
                </NavLink>
                {/* Reddit's API doesn't return the right JSON when filtering the 'hot' section with geo_filter. Instead it returns post for 'global' */}
                {/* {pathname.includes('hot') &&
                    <div className='filter-button hot'  >
                            <select value={secondFilter} onChange={handleChange}>            
                                {regions.map((region, index) => {
		                            return (
			                            <option key={index} value={region}>{region}</option>
		                            )
                                })}
                                
                            </select>
                    </div>
                } */}
                <NavLink to={'/new/'} style={style} >
                    <div className='filter-button new'  >
                        <img src={require('../images/new2.png')} className='filter' alt="" />
                    </div>
                </NavLink>
                <NavLink to={'/top/?t=day'} style={style} >
                    <div className='filter-button top'  >
                        <img src={require('../images/top2.png')} className='filter' alt="" />
                        {pathname.includes('top') &&
                            <div className='filter-button select'  >
                                    <select value={topFilter} onChange={handleChange}>            
                                        {timeframes.map((timeframe, index) => {
                                            return (
                                                <option key={index} value={timeframe}>{timeframe}</option>
                                            )
                                        })}
                                        
                                    </select>
                            </div>
                        }
                    </div>
                </NavLink>
                <NavLink to={'/rising/'} style={style} >
                    <div className='filter-button rising'  >
                        <img src={require('../images/rising2.png')} className='filter' alt="" />
                    </div>
                </NavLink>
            </div>
        </div>
    )

    
}

