import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectComments, clearComments, isLoadingComments } from "../comments/commentsSlice"
import { selectTheme } from "../theme/themeSlice"
import { Media } from "./Media"
import { Comment } from "../comments/comment"
import { useNavigate } from "react-router-dom"
import { selectChosenPost} from '../posts/postsSlice'
import { lightTheme, darkTheme } from "../../components/themes"
import { Loading } from "../../components/Loading"

 export const PostDetails = () => {

    // console.log('Component Post')

    const commentsAreLoading = useSelector(isLoadingComments)
    const theme = useSelector(selectTheme)
    const post = useSelector(selectChosenPost) 
    const comments = useSelector(selectComments)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleOnClick () {
        dispatch(clearComments())
        navigate(-1)
    }

    return (
        <div className="PostDetails-component" onClick={handleOnClick} style={theme==='light'?{backgroundColor: '#DAE0E6'}:{backgroundColor: '#030303'}}>
            {commentsAreLoading===true && <Loading theme={theme}/>}
            <div className="post" style={theme==='light'?lightTheme:darkTheme}>
                <div className="upper-part" >
                    <div className="left-section">
                        <img src={require('../../images/upArrow.png')} className="up arrow" alt=""/>
                        <p className="ups-number">{post.ups}K</p>
                        <img src={require('../../images/downArrow.png')} className="down arrow" alt=""/>
                    </div>
                    <div className="right-section">
                        <h1 className="post-title">{post.title}</h1>
                        {post.selftext!=='' && <p className="selftext">{post.selftext}</p>}
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
                <div className="comments-section" style={theme==='light'?{...lightTheme, border: 'none'}:{...darkTheme, border: 'none'}} data-testid='test1'>
                    {comments.map((comment, index)=><Comment comment={comment} key={index} commentIndex={index}/>)} 
                </div>
            </div>
        </div>
    )
 }