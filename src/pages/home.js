import React from "react";
import { Row, Col, Button } from "antd";

import "../style.css";

export default () => (
  <Row type="flex" justify="center" style={{ margin: 80 }}>
    <Row justify="space-between" type="flex" gutter={48}>
      <Col span={12}>
        <Button size="large" className="button" href="/question">
          Q & A Session
        </Button>
      </Col>
      <Col span={12}>
        <Button size="large" className="button">
          Feedback Form
        </Button>
      </Col>
    </Row>
  </Row>
);
