import { createSlice } from '@reduxjs/toolkit';


const initialState = [
    { id: 1, name: 'First Post', content: 'Hello its me' },
    { id: 2, name: 'Second Post', content: 'bla bla bla bla bla bla bla' }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload)
        },
        postUpdated(state, action) {
            const { id, name, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
              existingPost.name = name
              existingPost.content = content
            }
          }
    }
})

export const { postAdded,postUpdated } = postsSlice.actions
export default postsSlice.reducer
