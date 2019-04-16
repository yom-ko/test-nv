import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import store from 'store';

// Import App component
import App from 'screens/App';

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
