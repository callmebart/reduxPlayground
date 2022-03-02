// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with 'http://192.168.1.9:3000'
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.9:3000' }),
    // The "endpoints" represent operations and requests for this server
    endpoints: builder => ({
        // The `getPosts` endpoint is a "query" operation that returns data
        getPosts: builder.query({
            // The URL for the request is 'http://192.168.1.9:3000/getPosts'
            // query: () => ({
            //     url: '/getPosts', method: 'POST', headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //     }
            // })
            // ^-ok
            query:()=>({url:'/getPosts',method:'POST'}) //ok
        })
    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetPostsQuery } = apiSlice