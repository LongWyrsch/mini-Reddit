import React, { useEffect, useState } from "react"
import { Media } from "./Media"
import { useDispatch, useSelector } from "react-redux"
import { selectTheme } from "../theme/themeSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { getComments } from "../comments/commentsSlice"
import { getPosts, selectPosts, choosePost } from './postsSlice'
import { getComments } from '../comments/commentsSlice'

export const Post = ({post}) => {
    
    // console.log('Component Post rendered with: ' + post.title.substring(0,20))
    const dispatch = useDispatch()

    // console.log(`
    // title: ${post.title}, 
    // ups: ${post.ups},
    // author: ${post.author},
    // timeElapsed: ${post.timeElapsed},
    // num_comments: ${post.num_comments},
    // permalink: ${post.permalink},
    // media: ${post.media}
    // `
    // )

    // console.log(post.title.substring(0,20))
    // console.log(posts)

    const theme = useSelector(selectTheme)

    const darkTheme = {
        backgroundColor: '#1A1A1A', 
        color: 'white',
        border: 'solid #424242 2px'
    }

    const lightTheme = {
        backgroundColor: '#F6F7F8', 
        color: 'black',
        border: 'solid #C0C0C0 2px'
    }

    // console.log(post.media)

    // const location = useLocation()
    // function handleOnClick () {
    //     const postName = post.permalink.substring(post.permalink.substring(0,post.permalink.length-1).lastIndexOf('/')+1, post.permalink.length)
    //     navigate(`${location.pathname}/permalink/${postName}`)
    //     selectPost(post)
    //     // console.log(postName)
    //     // console.log(location.pathname)
    // }

    function handleOnClick () {
        dispatch(getComments(post.permalink))
        dispatch(choosePost(post))
        // setSelectedPost(post)
        // console.log('handleOnClick recieved the post: ')
    }

    return (
        <div className="Post-component" style={theme==='light'?lightTheme:darkTheme}>
            <div className="left-section">
                <img src={require('../../images/upArrow.png')} className="up arrow" alt=""/>
                <p className="ups-number">{post.ups}K</p>
                <img src={require('../../images/downArrow.png')} className="down arrow" alt=""/>
            </div>
            <div className="right-section">
                <Link to={post.permalink.substring(post.permalink.substring(0,post.permalink.length-1).lastIndexOf('/')+1, post.permalink.length)}>
                    <h1 className="post-title" onClick={handleOnClick}>{post.title}</h1>
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
