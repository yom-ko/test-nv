import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { actions } from 'modules/app';
import { requestLogin, parseResponse } from 'utils/helpers';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { hash } = document.location;
    const { logUserIn } = this.props;

    if (/token|error/.test(hash)) {
      const result = parseResponse();
      logUserIn(result);

      if (typeof result === 'string') {
        localStorage.setItem('myToken', result);
      }
    }
  }

  componentWillUnmount() {
    if (localStorage.getItem('myToken')) {
      localStorage.removeItem('myToken');
    }
  }

  handleLogout() {
    const { logUserOut } = this.props;

    logUserOut();
    window.location.replace('https://test-nv.netlify.com');
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <>
        {!isLoggedIn ? (
          <>
            <Button onClick={requestLogin}>Login</Button>
          </>
        ) : (
          <>
            <Button onClick={this.handleLogout}>Logout</Button>
            <h3>Disk Contents</h3>
          </>
        )}
      </>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = ({ app }) => ({
  items: app.items,
  isLoggedIn: app.isLoggedIn,
  loginError: app.loginError
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logUserIn: actions.logUserIn,
    logUserOut: actions.logUserOut,
    receiveListing: actions.receiveListing
  },
  dispatch
);

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
