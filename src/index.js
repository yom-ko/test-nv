import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { saveState } from 'utils/helpers';

import store from 'store';

// Import App component
import App from 'screens/App';

// Save state to the browser's localStorage
store.subscribe(() => {
  saveState({
    app: {
      isLoggedIn: false,
      loginError: null,
      token: store.getState().app.token,
      path: '/',
      listing: {}
    }
  });
});

// Define App mount node
const mount = document.getElementById('app');

// Render App
render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  mount
);
