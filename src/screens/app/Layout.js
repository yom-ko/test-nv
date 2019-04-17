import React from 'react';
import { Container, Row, Col } from 'reactstrap';

const Layout = ({ children }) => (
  <Container>
    <Row className="justify-content-center" style={{ marginTop: '3rem' }}>
      <Col sm="9" xs="12">
        {children}
      </Col>
    </Row>
  </Container>
);

export default Layout;
