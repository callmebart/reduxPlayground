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
        }
    },
})

export const { postAdded } = postsSlice.actions
export default postsSlice.reducer
