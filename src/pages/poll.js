import React from "react";
import publicIp from "public-ip";
import { Spin, Typography, Form, Radio, Button, Row, Col } from "antd";

import "../style.css";

import FirebaseContext from "../firebase";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

const Poll = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [pollLoading, setPollLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [pollQuestion, setPollQuestion] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = React.useState(false);

  React.useEffect(() => {
    async function loadQuestion() {
      setPollLoading(true);
      const db = firebase.firestore();
      const querySnapshot = await db
        .collection("polls")
        .where("freeze", "==", false)
        .get();
      const [doc] = querySnapshot.docs;
      setPollQuestion(doc);
      setPollLoading(false);
    }

    if (firebase) {
      loadQuestion();
    }
  }, [firebase]);

  if (pollLoading) {
    return (
      <Row
        justify="center"
        type="flex"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Spin size="large" />
      </Row>
    );
  }

  if (!pollLoading && !pollQuestion) {
    return (
      <Row
        justify="center"
        type="flex"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Typography.Title level={2}>
          No polls available right now! Come back soon!
        </Typography.Title>
      </Row>
    );
  }

  if (submitted) {
    return (
      <Row
        justify="center"
        type="flex"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Typography.Title level={2}>
          Your vote counted! Thanks!
        </Typography.Title>
      </Row>
    );
  }

  if (alreadySubmitted) {
    return (
      <Row
        justify="center"
        type="flex"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Typography.Title level={2}>
          Your vote was already captured!
        </Typography.Title>
      </Row>
    );
  }

  const handleOptionChange = e => {
    e.preventDefault();
    setSelectedOption(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const { id } = pollQuestion;
    const ip = await publicIp.v4();
    const db = firebase.firestore();

    // const qs = await db
    //   .collection("poll-answers")
    //   .where("pollid", "==", id)
    //   .where("ip", "==", ip)
    //   .get();
    // if (qs.docs.length > 0) {
    //   setAlreadySubmitted(true);
    //   setLoading(false);
    //   return;
    // }

    await db.collection("poll-answers").add({
      pollid: id,
      answer: selectedOption,
      createdAt: Date.now(),
      ip
    });
    setLoading(false);
    setSubmitted(true);
  };

  const { question, options } = pollQuestion.data();

  return (
    <Row
      justify="center"
      type="flex"
      style={{ marginTop: 30, marginBottom: 30 }}
    >
      <Col>
        <Typography.Title level={2}>{question}</Typography.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            <Radio.Group onChange={handleOptionChange} value={selectedOption}>
              {options.map(option => (
                <Radio style={radioStyle} key={option} value={option}>
                  {option}
                </Radio>
              ))}
            </Radio.Group>
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
  );
};

export default Poll;
