import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async () => {
        // async (_, { getState }) => {
        // const allNotifications = selectAllNotifucations(getState())
        // const [latestNotifications] = allNotifications
        // const latestTimeStamp = latestNotifications ? latestNotification.date : ''
        const res =  await fetch('http://192.168.1.9:3000/getNotifications', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })

        return res.json();
    }
)
export const addNotifications = createAsyncThunk(
    'notifications/addNotifications',
    async initialNoti => {

        const response = await fetch('http://192.168.1.9:3000/addNotification', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: nanoid(),
                name: 'New Post Added',
                date: new Date(),
                user: initialNoti.user,
            })
        })
        return response.json()
    }
)

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducer: {},
    extraReducers: {
        [fetchNotifications.fulfilled]: (state, action) => {
            state.push(...action.payload)
        },
    }
})

export default notificationsSlice.reducer
export const selectAllNotifications = state => state.notifications