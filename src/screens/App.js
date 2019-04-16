import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';

// Import high-level components
import Layout from 'screens/app/Layout';
import Home from 'screens/Home';

// Import Bootstrap styles (shared by all components)
import 'bootstrap/dist/css/bootstrap.min.css';

// App component with routes
export const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Layout>
);

export default hot(module)(App);
