import React from "react";
import { Row, Typography, Button } from "antd";

import "../style.css";

import FirebaseContext from "../firebase";

const Question = () => {
  const [question, setQuestion] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { firebase } = React.useContext(FirebaseContext);

  const handleSubmit = async e => {
    e.preventDefault();
    const db = firebase.firestore();

    try {
      setLoading(true);
      await db.collection("questions").add({
        question,
        createdAt: Date.now()
      });
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <Row
        justify="center"
        type="flex"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Typography.Title level={2}>
          Thank you for submitting the question!
        </Typography.Title>
      </Row>
    );
  }

  return (
    <>
      <Row justify="center" type="flex" style={{ marginTop: 30 }}>
        <Typography.Title level={2}>Post your question here:</Typography.Title>
      </Row>

      <Row justify="center" type="flex" style={{ margin: 10 }}>
        <textarea
          rows={10}
          cols={100}
          onChange={e => setQuestion(e.target.value)}
          value={question}
        />
      </Row>

      <Row justify="center" type="flex" style={{ marginBottom: 10 }}>
        <Button
          size="large"
          className="button"
          onClick={handleSubmit}
          loading={loading}
        >
          Submit
        </Button>
      </Row>

      <Row justify="center" type="flex" style={{ marginBottom: 30 }}>
        <Typography.Text type="secondary">
          * Please note that we're not taking your personal / company details,
          the Q&A form stays completely anonymous. Privacy Protected!
        </Typography.Text>
      </Row>
    </>
  );
};

export default Question;
