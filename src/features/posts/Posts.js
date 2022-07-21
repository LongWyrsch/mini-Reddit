import React from 'react'
import {useSelector} from 'react-redux'
import { Post } from "./Post"
import { selectPosts, isLoadingPosts } from './postsSlice'
import { selectTheme } from '../theme/themeSlice'
import { Loading } from '../../components/Loading'

export const Posts = () => {

    console.log('Component Posts rendered')

    const theme = useSelector(selectTheme)
    const postsAreLoaing = useSelector(isLoadingPosts)
    const posts = useSelector(selectPosts) 

    return (
        <div className='Posts-component'>
            {postsAreLoaing===true && <Loading theme={theme}/>}
            <ul>
                {posts.map((post)=>(
                    <li key={post.id}>
                            <Post post={post} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
