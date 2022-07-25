import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (url, thunkAPI) => {
        const response = await fetch(url)
        const json = await response.json()
        // console.log('title: ' + json.data.children[0].data.title)
        return json

    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        chosenPost: {},
        isLoading: false,
        hasError: false
    },
    reducers: {
        choosePost: (state, action) => {
            state.chosenPost = action.payload
        }
    },
    extraReducers: {
        [getPosts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;             
        },
        [getPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.data.children.map(post=>{
                
                let media = [];
                let mediaType = ''
                if (post.data.media_metadata) {
                    for (const key in post.data.media_metadata) {
                        media.unshift((post.data.media_metadata[key].s.u)?.replaceAll('amp;',''))
                    }
                    mediaType = 'gallery'
                } else if (post.data.is_video === true) {
                    media = [post.data.media.reddit_video.fallback_url]
                    mediaType = 'video'
                } else if (post.data.url.includes('.gif') ) {
                    media = [post.data.url]
                    mediaType = 'gif'
                } else if (post.data.url.includes('.jpg') ) {
                    media = [post.data.url]
                    mediaType = 'jpg'
                } else if (post.data.url.includes('.png') ) {
                    media = [post.data.url]
                    mediaType = 'png'
                } else {
                    media = ['media not found']
                    mediaType = 'media not found'
                }

                let timeElapsed = '' 
                if ((Date.now() - post.data.created*1000)/1000/60/60 < 23) {
                    timeElapsed = Math.ceil((Date.now() - post.data.created*1000)/1000/60/60) + ' hours ago'
                } else {
                    timeElapsed = Math.ceil((Date.now() - post.data.created*1000)/1000/60/60/24) + ' days ago'
                }

                let ups = 0
                if (post.data.ups < 1000) {
                    ups = post.data.ups
                } else {
                    ups = Math.round((post.data.ups)/100)/10
                }

                let numComments = 0
                if (post.data.num_comments < 1000) {
                    numComments = post.data.num_comments
                } else {
                    numComments = Math.round((post.data.num_comments)/100)/10
                }                

                return {
                    title: post.data.title, 
                    ups: ups,
                    author: post.data.author,
                    timeElapsed: timeElapsed,
                    num_comments: numComments,
                    permalink: post.data.permalink,
                    media: media,
                    mediaType: mediaType,
                    id: post.data.id,
                    selftext: post.data.selftext
                }
            })
            state.isLoading = false;
            state.hasError = false;  
        },
        [getPosts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;                
        }
    }
})

export const selectPosts = (state) => state.posts.posts
export const selectChosenPost = (state) => state.posts.chosenPost
export const isLoadingPosts = (state) => state.posts.isLoading
export const {choosePost} = postsSlice.actions
export default postsSlice.reducer