/*Redux libs*/
import {configureStore,} from '@reduxjs/toolkit';
  
/*Reducers*/
import counterReducer from './features/counter/counterSlice';
import postsReducer from './features/posts/postsSlice';  
import userReducer from './features/users/usersSlice';

  const store = configureStore({
    reducer:{
      counter:counterReducer,
      posts:postsReducer,
      users:userReducer,
    } 
  })
  
  export default store