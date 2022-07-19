import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate, Routes, Route, useLocation, Link, useParams, useSearchParams, Outlet } from 'react-router-dom'
import { Post } from "./Post"
import { getPosts, selectPosts, choosePost } from './postsSlice'
import {PostDetails} from './PostDetails'
import { getComments } from '../comments/commentsSlice'

export const Posts = () => {

    console.log('Component Posts rendered')

    // const [selectedPost, setSelectedPost] = useState({})
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     console.log('useEffect rendered')
    //     dispatch(getPosts('https://www.reddit.com/r/Popular.json?geo_filter=GLOBAL'))
    //   },[])




    const posts = useSelector(selectPosts) 

    // console.log(`selectedPost = `)
    // console.log(selectedPost)

    return (
        <div className='Posts-component'>
            <ul>
                {posts.map((post)=>(
                    <li key={post.id}>
                        {/* <Link to={post.permalink.substring(post.permalink.substring(0,post.permalink.length-1).lastIndexOf('/')+1, post.permalink.length)}> */}
                        {/* <Link to=''> */}
                            <Post post={post} />
                        {/* </Link> */}
                    </li>
                ))}
            </ul>

        {/* <Outlet context={selectedPost}/> */}


            {/* <Routes>
                <Route path='/:firstFilter/:secondFilter/permalink/:permalink' element={<PostDetails post={selectedPost}/>} />
                <Route path='/:fiestFilter/permalink/:permalink' element={<PostDetails post={selectedPost}/>} />
                <Route path='/:firstFilter/:secondFilter' element={<PostsList posts={posts} selectPost={selectPost}/>}/>
                <Route path='/:firstFilter/' element={<PostsList posts={posts} selectPost={selectPost}/>}/>
                <Route path='/' element={<PostsList posts={posts} selectPost={selectPost}/>}/>
            </Routes> */}
        </div>
    )
}

// const PostsList = ({posts,selectPost}) => {
//     return(
//         <div>
//             <ul>
//                 {posts.map((post)=>(
//                     <li key={post.id}>
//                         <Link to={''}>
//                             <Post post={post} selectPost={selectPost}/>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     )
// }