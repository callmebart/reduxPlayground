import { createEntityAdapter, createSelector, createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const initialState = [
    { id: '0', name: 'Bartosz Batosiewicz' },
    { id: '1', name: 'Jan Kowalski' },
    { id: '2', name: 'Emily Rozmarynsky' },
]

const usersSliece = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export default usersSliece.reducer

// export const selectAllUsers = state => state.users;

// export const selectUserById = (state, userId) =>
//     state.users.find(user => user.id === userId)

// const usersAdapter = createEntityAdapter()

// const initialStateWithAdapter = usersAdapter.getInitialState()


/*RTK QUERY GETTING USERS*/
//instead of building it apiSlice we can make it here and inject it 

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({ url: '/getUsers', method: 'POST' })
        }),
        //using adapter we can use transformResponse in entiti case fo eg.
        // transformResponse: responseData => {
        //     return usersAdapter.setAll(initialStateWithAdapter, responseData)
        // }

    })
})
export const { useGetUsersQuery } = extendedApiSlice

//we are dispatching them in App.js 
//with that stuff below we dont even need createSlice here because we got it from app cache 
export const selectUsersResult = apiSlice.endpoints.getUsers.select()
const emptyUsers = []
export const selectAllUsers = createSelector(
    selectUsersResult,
    usersResult => usersResult?.data ?? emptyUsers // ?? getting as long as it is not equal null or undefined
)

export const selectUserById = createSelector(
    selectAllUsers,
    (state, userId) => userId,
    (users, userId) => users.find(user => user.id === userId)
)

//with entity adapter 
// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors(state => selectUsersData(state) ?? initialStateWithAdapter)
