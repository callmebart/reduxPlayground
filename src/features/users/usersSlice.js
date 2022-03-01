import { createSlice } from "@reduxjs/toolkit";

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

export const selectAllUsers = state => state.users;

export const selectUserById = (state, userId) =>
  state.users.find(user => user.id === userId)