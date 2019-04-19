import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { actions } from 'modules/app';

// Import high-level components
import Layout from 'screens/app/Layout';
import Login from 'screens/Login'; // Public
import Disk from 'screens/Disk'; // Protected

// Import Bootstrap styles (shared by all components)
import 'bootstrap/dist/css/bootstrap.min.css';

// App component
class App extends Component {
  componentDidMount() {
    const { attemptToLogUserIn } = this.props;

    attemptToLogUserIn();
  }

  render() {
    const { isLoggedIn } = this.props;

    return <Layout>{isLoggedIn ? <Disk /> : <Login />}</Layout>;
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  attemptToLogUserIn: PropTypes.func.isRequired
};

// Map state and dispatch() to the component props
const mapStateToProps = ({ app }) => ({
  isLoggedIn: app.isLoggedIn
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    attemptToLogUserIn: actions.attemptToLogUserIn
  },
  dispatch
);

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
