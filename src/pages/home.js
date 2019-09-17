import React from "react";
import { Row, Col, Button } from "antd";

import "../style.css";

export default () => (
  <>
    <Row type="flex" justify="center" style={{ marginTop: 80 }} gutter={48}>
      <Col lg={8} md={10} sm={20} xs={20} className="home-container">
        <Button size="large" block className="button" href="/question">
          Live Q & A
        </Button>
      </Col>
      <Col lg={8} md={10} sm={20} xs={20} className="home-container">
        <Button size="large" block className="button" href="/poll">
          Live Poll
        </Button>
      </Col>
    </Row>
    <Row type="flex" justify="center" style={{ marginBottom: 80 }}>
      <Col lg={8} md={10} sm={20} xs={20}>
        <Button size="large" block className="button" href="/feedback">
          Let's Connect!
        </Button>
      </Col>
    </Row>
  </>
);
