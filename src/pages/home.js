import React from "react";
import { Row, Col, Button } from "antd";

import "../style.css";

export default () => (
  <Row type="flex" justify="center" style={{ marginTop: 80, marginBottom: 80 }}>
    {/* <Row justify="space-between" type="flex"> */}
    <Col lg={4} sm={2} md={6}>
      <Button size="large" className="button" href="/question">
        Q & A Session
      </Button>
    </Col>
    <Col lg={4} sm={2} md={6}>
      <Button size="large" className="button" href="/feedback">
        Feedback Form
      </Button>
    </Col>
    <Col lg={4} sm={2} md={6}>
      <Button size="large" className="button" href="/poll">
        Poll
      </Button>
    </Col>
    {/* </Row> */}
  </Row>
);
