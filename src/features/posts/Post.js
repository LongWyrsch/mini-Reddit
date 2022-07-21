import React from "react"
import { Media } from "./Media"
import { useDispatch, useSelector } from "react-redux"
import { selectTheme } from "../theme/themeSlice"
import { Link, useLocation } from "react-router-dom"
import { choosePost } from './postsSlice'
import { getComments } from '../comments/commentsSlice'
import { lightTheme, darkTheme } from "../../components/themes"
export const Post = ({post}) => {

    const dispatch = useDispatch()
    const theme = useSelector(selectTheme)

    function handleOnClick () {
        dispatch(getComments(post.permalink))
        dispatch(choosePost(post))
    }

    const pathname = useLocation().pathname
    let prefix = ''
    pathname === '/'? prefix = 'hot/' : prefix = ''
    const linkToDetailedPost = prefix + post.permalink.substring(post.permalink.substring(0,post.permalink.length-1).lastIndexOf('/')+1, post.permalink.length)


    return (
        <div className="Post-component" style={theme==='light'?lightTheme:darkTheme}>
            <div className="left-section">
                <img src={require('../../images/upArrow.png')} className="up arrow" alt=""/>
                <p className="ups-number">{post.ups}K</p>
                <img src={require('../../images/downArrow.png')} className="down arrow" alt=""/>
            </div>
            <div className="right-section">
                <Link to={linkToDetailedPost}>
                    <h1 className="post-title" onClick={handleOnClick} style={theme==='light'?{color:'black'}:{color:'white'}}>{post.title} </h1>
                </Link>
                <Media media={post.media} mediaType={post.mediaType}/>
                <div>
                    <div className="commentsNumber">
                        <img src={require('../../images/comments.png')} alt="" />
                        <p>{post.num_comments} Comments</p>
                    </div>
                    <p className="author">Post by {post.author}</p>
                    <p className="timeElapsed">Created {post.timeElapsed}</p>
                </div>
            </div>
        </div>
    )
} 
