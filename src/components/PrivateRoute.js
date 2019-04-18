import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log(isLoggedIn);
      return isLoggedIn ? <Component {...props} /> : <Redirect to="/" />;
    }}
  />
);

const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn
});

export default connect(mapStateToProps)(PrivateRoute);
