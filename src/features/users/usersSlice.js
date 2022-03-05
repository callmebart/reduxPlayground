import { createSelector, createSlice } from "@reduxjs/toolkit";
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

/*RTK QUERY GETTING USERS*/
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
