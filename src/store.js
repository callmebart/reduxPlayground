/*Redux libs*/
import {configureStore,} from '@reduxjs/toolkit';
  
/*Reducers*/
import counterReducer from './features/counter/counterSlice';
import postsReducer from './features/posts/postsSlice';  
import userReducer from './features/users/usersSlice';
import notifications from './notifications/notificationsSlice';

  const store = configureStore({
    reducer:{
      counter:counterReducer,
      posts:postsReducer,
      users:userReducer,
      notifications:notifications
    } 
  })
  
  export default store