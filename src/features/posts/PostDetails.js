import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { getComments, selectComments, clearComments } from "../comments/commentsSlice"
import { selectTheme } from "../theme/themeSlice"
import { Media } from "./Media"
import { Comment } from "../comments/comment"
import { useNavigate, useOutletContext } from "react-router-dom"
import {selectChosenPost} from '../posts/postsSlice'

 export const PostDetails = () => {
    // const post = useOutletContext();
    // console.log('Component PostDetails rendered')
    // console.log(post)

    const theme = useSelector(selectTheme)
    const post = useSelector(selectChosenPost) 
    const comments = useSelector(selectComments)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // console.log(post)
    
    const darkTheme = {
        backgroundColor: '#1A1A1A', 
        color: 'white'
    }

    const lightTheme = {
        backgroundColor: '#F6F7F8', 
        color: 'black'
    }

    function handleOnClick () {
        dispatch(clearComments())
        navigate(-1)
    }
    
    // console.log(`${post.title} --> comments:`)
    // console.log(comments)

    return (
        <div className="PostDetails-component" onClick={handleOnClick} style={theme==='light'?{backgroundColor: '#DAE0E6'}:{backgroundColor: '#030303'}}>
            <div className="post" style={theme==='light'?lightTheme:darkTheme}>
                <div className="upper-part" >
                    <div className="left-section">
                        <img src={require('../../images/upArrow.png')} className="up arrow" alt=""/>
                        <p className="ups-number">{post.ups}K</p>
                        <img src={require('../../images/downArrow.png')} className="down arrow" alt=""/>
                    </div>
                    <div className="right-section">
                        <h1 className="post-title">{post.title}</h1>
                        <Media media={post.media} mediaType={post.mediaType}/>
                        <div >
                            <div className="commentsNumber">
                                <img src={require('../../images/comments.png')} alt=""/>
                                <p>{post.num_comments} Comments</p>
                            </div>
                            <p className="author">Post by {post.author}</p>
                            <p className="timeElapsed">Created {post.timeElapsed}</p>
                        </div>
                    </div>
                </div >
                <hr/>
                <div className="comments-section" style={theme==='light'?lightTheme:darkTheme}>
                    {comments.map((comment, index)=><Comment comment={comment} key={index}/>)} 
                </div>

            </div>
        </div>
    )
 }