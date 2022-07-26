import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Middleware fetches JSON (comments) for the post before feeding it to the slice
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
        //When exiting a postDetails view (by clicking anywhere), the comments are cleared from the store to avoid showing them the next time an other postDetails is shown.
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
            state.isLoading = false;
            state.hasError = false;
            action.payload[1].data.children.forEach((comment, index)=>{
                state.comments.push(
                    {
                        comment : comment.data.body, 
                        author: comment.data.author,
                        replies : comment.data.replies? comment.data.replies.data.children.map(reply=>({reply: reply.data.body, author: reply.data.author})):''  //comments on level 2   
                    }   
                )
                
            })
        },
        [getComments.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export default commentsSlice.reducer
export const selectComments = (state) => state.comments.comments
export const isLoadingComments = (state) => state.comments.isLoading
export const {clearComments} = commentsSlice.actions