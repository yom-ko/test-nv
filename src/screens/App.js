import React from 'react';
import { hot } from 'react-hot-loader';

// Import high-level components
import Layout from 'screens/app/Layout';
import Home from 'screens/Home';

// Import Bootstrap styles (shared by all components)
import 'bootstrap/dist/css/bootstrap.min.css';

// App component with routes
export const App = () => (
  <Layout>
    <Home />
  </Layout>
);

export default hot(module)(App);
