
import React from 'react'

/*Redux*/
import { Provider } from 'react-redux';
import store from './src/store';

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