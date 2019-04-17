import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Button } from 'reactstrap';

import { actions } from 'modules/app';
import { requestAuth, attemptToLogIn, updateListingForPath } from 'utils/helpers';

import ResourceList from 'components/ResourceList';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  componentDidMount() {
    const { logUserIn, receiveListing, path } = this.props;

    attemptToLogIn(logUserIn, receiveListing, path);
  }

  componentWillUnmount() {
    if (localStorage.getItem('myToken')) {
      localStorage.removeItem('myToken');
    }
  }

  handleLogout() {
    const { logUserOut } = this.props;

    localStorage.removeItem('myToken');
    window.location.replace('https://test-nv.netlify.com');
    setTimeout(() => {
      logUserOut();
    }, 1500);
  }

  handleItemClick(path) {
    const { receiveListing, changePath } = this.props;

    updateListingForPath(receiveListing, changePath, path);
  }

  render() {
    const { isLoggedIn, listing } = this.props;
    let items = [];

    if (Object.keys(listing).length) {
      const { _embedded } = listing;
      const { items: newItems } = _embedded;
      items = newItems;
    }

    return (
      <>
        {!isLoggedIn ? (
          <>
            <Row className="justify-content-center">
              <h1 style={{ textAlign: 'center' }}>Войдите в свой аккаунт</h1>
            </Row>
            <Row className="justify-content-center">
              <Button size="lg" color="warning" onClick={requestAuth}>
                Войти
              </Button>
            </Row>
          </>
        ) : (
          <>
            <Row className="justify-content-end">
              <Button color="link" onClick={this.handleLogout}>
                Выйти
              </Button>
            </Row>
            <h1 style={{ fontSize: '2rem', marginBottom: '1.1rem' }}>Содержимое вашего диска:</h1>
            <ResourceList items={items} handleItemClick={this.handleItemClick} />
          </>
        )}
      </>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = ({ app }) => ({
  path: app.path,
  listing: app.listing,
  isLoggedIn: app.isLoggedIn,
  loginError: app.loginError
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    logUserIn: actions.logUserIn,
    logUserOut: actions.logUserOut,
    changePath: actions.changePath,
    receiveListing: actions.receiveListing
  },
  dispatch
);

// Connect the container component to Redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
