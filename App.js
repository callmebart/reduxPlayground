import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react'


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