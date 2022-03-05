// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our single API slice object
export const apiSlice = createApi({
    // The cache reducer expects to be added at `state.api` (already default - this is optional)
    reducerPath: 'api',
    // All of our requests will have URLs starting with 'http://192.168.1.9:3000'
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.9:3000' }),
    tagTypes: ['Post'],//root tag names to automatic refresh cache we will when mutation is happening name doesnt matter
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
            query: () => ({ url: '/getPosts', method: 'POST' }), //ok
            //query:()=>'/getPosts' not ok cause by default there is 'GET' method
            //providesTags: ['Post'] //describing data in that query enpoints
            //to make refetch for specific id only 
            providesTags: (result = [], error, arg) => [
                'Post',
                ...result.map(({ id }) => ({ type: 'Post', id }))
            ]
        }),
        getPost: builder.query({
            query: (postId) => ({
                url: '/getPost',
                method: 'POST',
                body: { postId } //important without {} didnt work !
            }),
            providesTags: (result, error, arg) => [{ type: 'Post', id: arg }]//only for individual post id:arg cause data {postid}
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/addPostByMutation',
                method: 'POST',
                // Include the entire post object as the body of the request
                body: initialPost
            }),
            invalidatesTags: ['Post'],//mutation endpoints listing a set of 
            //tags that are invalidated every time that mutation runs
        }),
        editPost: builder.mutation({
            query: post => ({
                url: '/editPostByMutation',
                method: 'POST',
                body: post
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]//refetch posts list and specfic field arg.id cause data post
        }),


        //USERS_QUERY_ENDPOINTS
        getUsers: builder.query({
            query: () => ({ url: '/getUsers', method: 'POST' })
        })

    })
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddNewPostMutation,
    useEditPostMutation,

    useGetUsersQuery,
} = apiSlice