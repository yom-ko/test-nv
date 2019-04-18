import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Row, Button } from 'reactstrap';

import { actions, getItems } from 'modules/app';

import ResourceList from 'screens/disk/ResourceList';

class Disk extends Component {
  componentDidMount() {
    const { token, path, requestListing, history } = this.props;
    requestListing(token, path);

    history.listen(location => {
      let newPath = location.pathname.replace(/^\/+/g, '');
      if (!newPath) {
        newPath = '/';
      }
      requestListing(token, newPath);
    });
  }

  componentWillUnmount() {
    const { requestLogout } = this.props;
    requestLogout();
  }

  render() {
    const { items, requestLogout } = this.props;

    return (
      <>
        <Row className="justify-content-end">
          <Button color="link" onClick={() => requestLogout()}>
            Выйти
          </Button>
        </Row>
        <h1 style={{ fontSize: '2rem', marginBottom: '1.1rem' }}>Содержимое вашего диска:</h1>
        <ResourceList items={items} />
      </>
    );
  }
}

// Map state and dispatch() to the component props
const mapStateToProps = ({ app }) => ({
  path: app.path,
  token: app.token,
  items: getItems(app)
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    requestLogout: actions.requestLogout,
    requestListing: actions.requestListing
  },
  dispatch
);

// Connect the container component to Redux store
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Disk)
);
