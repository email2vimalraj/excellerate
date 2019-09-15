import React from "react";
import { Link } from "@reach/router";
import { Form, Input, Typography, Button, Row, Col, Breadcrumb } from "antd";

import "../../style.css";

import FirebaseContext from "../../firebase";

const AddPoll = () => {
  const [loading, setLoading] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");

  const { firebase } = React.useContext(FirebaseContext);

  const onTextChange = e => {
    setSubmitted(false);
    if (e.target.id === "question") {
      setQuestion(e.target.value);
    }
    if (e.target.id === "option1") {
      setOption1(e.target.value);
    }
    if (e.target.id === "option2") {
      setOption2(e.target.value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    const options = [option1, option2];
    const db = firebase.firestore();
    await db.collection("polls").add({
      question,
      options,
      freeze: true,
      createdAt: Date.now()
    });

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/Ecl1392019">Admin Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Add Poll</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      {submitted && (
        <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
          <Col span={12}>
            <Typography.Title level={3}>
              Poll Added Successfully!
            </Typography.Title>
          </Col>
        </Row>
      )}

      <Row
        type="flex"
        justify="center"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <Col span={12}>
          <Form onSubmit={handleSubmit}>
            <Form.Item label="Poll Question">
              <Input
                placeholder="question"
                id="question"
                onChange={onTextChange}
                value={question}
              />
            </Form.Item>

            <Form.Item label="Option 1">
              <Input
                placeholder="option 1"
                id="option1"
                onChange={onTextChange}
                value={option1}
              />
            </Form.Item>

            <Form.Item label="Option 2">
              <Input
                placeholder="option 2"
                id="option2"
                onChange={onTextChange}
                value={option2}
              />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType="submit"
                className="button"
                onClick={handleSubmit}
                loading={loading}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddPoll;
