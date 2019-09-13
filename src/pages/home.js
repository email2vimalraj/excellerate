import React from "react";
import { Row, Col, Button } from "antd";

import "../style.css";

export default () => (
  <Row type="flex" justify="center" style={{ marginTop: 80, marginBottom: 80 }}>
    <Row justify="space-between" type="flex">
      <Col span={12}>
        <Button size="large" className="button" href="/question">
          Q & A Session
        </Button>
      </Col>
      <Col span={12}>
        <Button size="large" className="button" href="/feedback">
          Feedback Form
        </Button>
      </Col>
    </Row>
  </Row>
);
