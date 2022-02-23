import { createSlice,nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns';

const initialState = [
    { id: 1, name: 'First Post', content: 'Hello its me',date: sub(new Date(),{minutes:10}).toISOString() },
    { id: 2, name: 'Second Post', content: 'bla bla bla bla bla bla bla', date: sub(new Date(),{minutes:5}).toISOString()}
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(name, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        name,
                        content,
                        user: userId
                    }
                }
            }
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

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer
