/*Redux libs*/
import { configureStore, } from '@reduxjs/toolkit';

/*Reducers*/
import counterReducer from './features/counter/counterSlice';
import postsReducer from './features/posts/postsSlice';
import userReducer from './features/users/usersSlice';
import notifications from './features/notifications/notificationsSlice';

//RTK QUERY
import { apiSlice } from './features/api/apiSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: userReducer,
    notifications: notifications,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store