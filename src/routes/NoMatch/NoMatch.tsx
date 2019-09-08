import React from 'react';
import { Row, Col, Alert } from 'antd';
import { Link } from 'react-router-dom';

const NoMatch: React.FC = () => {
  const AlertMessage = (
    <React.Fragment>
      <p>The page you were looking does not exist</p>
      <Link to="/">Go to the home page</Link>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Row type="flex" justify="center">
        <Col span={12}>
          <Alert message={AlertMessage} type="error" />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export { NoMatch };
