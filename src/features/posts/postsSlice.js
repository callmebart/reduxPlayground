import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { sub } from 'date-fns';
import axios from 'axios';


// const initialState = [
//     {
//         id: 1,
//         name: 'First Post',
//         content: 'Hello its me',
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//     },
//     {
//         id: 2, name: 'Second Post',
//         content: 'bla bla bla bla bla bla bla',
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
//     }
// ]

//v2
const initialState = {
    posts: [],
    status: 'idle',
    error: null
}

export const fetchPosts = createAsyncThunk('posts/getPosts', async () => {
    const response = await fetch('http://192.168.1.9:3000/getUsers', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then((response) =>{ return response.json()})
        .catch((error) => {
            console.error(error);
        });
    
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                // state.push(action.payload)
                state.posts.push(action.payload)
            },
            prepare(name, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        name,
                        content,
                        user: userId,
                        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 }
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, name, content } = action.payload
            //const existingPost = state.find(post => post.id === id)
            const existingPost = state.posts.find(post => post.id === id)
            if (existingPost) {
                existingPost.name = name
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            //const existingPost = state.find(post => post.id === postId)
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { reactionAdded, postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer

// selector functions 
//when we need list of elements 
//when we need to find element by ID


//export const selectAllPosts = state => state.posts
export const selectAllPosts = state => state.posts.posts
//we used that already in "existing post cases"
//export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId) 
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)
