import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Layout = ({ children }) => (
  <Container>
    <Row className="justify-content-center">
      <Col className="col-sm-12 col-md-9">
        <section style={{ marginTop: '2.5rem' }}>{children}</section>
      </Col>
    </Row>
  </Container>
);

export default Layout;
