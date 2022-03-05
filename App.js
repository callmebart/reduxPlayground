
import React from 'react'

/*Redux*/
import { Provider } from 'react-redux';
import store from './src/store';
import { apiSlice } from './src/features/api/apiSlice';

/*RTK QUERY HOOKS*/
store.dispatch(apiSlice.endpoints.getUsers.initiate())

/*Navigation*/
import Navigation from './navigation/Navigation';

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App