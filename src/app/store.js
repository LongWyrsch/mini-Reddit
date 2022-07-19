import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../features/posts/postsSlice'
import themeReducer from '../features/theme/themeSlice'
import commentsReducer from '../features/comments/commentsSlice'

export default configureStore({
    reducer: {
        posts: postsReducer,
        theme: themeReducer,
        comments: commentsReducer
    }
})