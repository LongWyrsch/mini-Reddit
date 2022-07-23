import React from 'react'
import {useSelector} from 'react-redux'
import { Post } from "./Post"
import { selectPosts, isLoadingPosts } from './postsSlice'
import { selectTheme } from '../theme/themeSlice'
import { Loading } from '../../components/Loading'

export const Posts = () => {

    // console.log('Component Posts starting to render')

    const theme = useSelector(selectTheme)
    // console.log('posts updated')
    const posts = useSelector(selectPosts) 
    // console.log('loading state updated')
    const postsAreLoaing = useSelector(isLoadingPosts)


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
