
import React from 'react'

/*Redux*/
import { Provider } from 'react-redux';
import store from './src/store';

import { extendedApiSlice } from './src/features/users/usersSlice'
//or if we do not use injectedendpoints
import { apiSlice } from './src/features/api/apiSlice'

/*RTK QUERY HOOKS*/
store.dispatch(extendedApiSlice.endpoints.getUsers.initiate())

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