import React from 'react';
import { Row, Button } from 'reactstrap';

import { tokenRequestBaseURL } from 'utils/api';

const Login = () => (
  <>
    <Row className="justify-content-center">
      <h1 style={{ textAlign: 'center' }}>Войдите в свой аккаунт</h1>
    </Row>
    <Row className="justify-content-center">
      <a href={tokenRequestBaseURL}>
        <Button size="lg" color="warning">
          Войти
        </Button>
      </a>
    </Row>
  </>
);

export default Login;
