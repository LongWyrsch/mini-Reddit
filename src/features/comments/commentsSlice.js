import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

export const getComments = createAsyncThunk(
    'comments/getComments',
    async (permalink, thunkAPI) => {
        const link = `https://www.reddit.com${permalink}.json`
        const response = await fetch(link)
        const json = await response.json()
        return json
    }
)

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: [],
        isLoading: false,
        hasError: false
    },
    reducers: {
        clearComments: (state, action) => {
            state.comments = []
        }
    },
    extraReducers: {
        [getComments.pending]: (state, action) => {
            state.isLoading = true;
            state.hasError = false;
        },
        [getComments.fulfilled]: (state, action) => {
            // console.log("reducer")
            state.comments = []
            action.payload[1].data.children.forEach((comment, index)=>{
                state.comments.push(
                    {
                        comment : comment.data.body, //comment on level 1
                        author: comment.data.author,
                        replies : comment.data.replies? comment.data.replies.data.children.map(reply=>({reply: reply.data.body, author: reply.data.author})):''  //comments on level 2   
                    }   
                )
                
            })
            // console.log('reducer')
            // console.log(current(state).comments)
            state.isLoading = false;
            state.hasError = false;
        },
        [getComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export default commentsSlice.reducer
export const selectComments = (state) => state.comments.comments
export const {clearComments} = commentsSlice.actions