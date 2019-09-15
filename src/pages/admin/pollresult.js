import React from "react";
import { Link } from "@reach/router";
import { Row, Spin, Progress, Col, Typography, Breadcrumb } from "antd";

import "../../style.css";

import FirebaseContext from "../../firebase";

const PollResult = ({ pollid }) => {
  const { firebase } = React.useContext(FirebaseContext);
  const [data, setData] = React.useState(null);
  const [question, setQuestion] = React.useState(null);

  React.useEffect(() => {
    let unsubscribe = null;
    async function loadResult() {
      const db = firebase.firestore();

      // 1. load the poll options
      const doc = await db
        .collection("polls")
        .doc(pollid)
        .get();
      const { options, question } = doc.data();
      setQuestion(question);

      // 2. load the poll results with the poll id
      unsubscribe = db
        .collection("poll-answers")
        .where("pollid", "==", pollid)
        .onSnapshot(function(qs) {
          const allAnswers = [];
          qs.docs.forEach(doc => allAnswers.push(doc.data().answer));

          // 3. calculate avg of each option
          const result = [];
          options.forEach(option => {
            let optionTotal = 0;
            allAnswers.forEach(answer => {
              if (option === answer) {
                optionTotal += 1;
              }
            });
            result.push({
              [option]: Math.round((optionTotal / allAnswers.length) * 100)
            });
          });
          setData(result);
        });
    }

    if (firebase) {
      loadResult();
    }

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebase, pollid]);

  if (!data) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/Ecl1392019">Admin Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/Ecl1392019/polllist">Poll List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Poll Results</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      <Row style={{ marginTop: 50, marginBottom: 50 }}>
        <Typography.Title
          level={2}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          {question}
        </Typography.Title>
        {data.map(item => (
          <Row
            key={Object.keys(item)[0]}
            type="flex"
            justify="center"
            style={{ marginBottom: 30 }}
          >
            <Col span={2} style={{ textAlign: "right", paddingRight: "20px" }}>
              <Typography.Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                {Object.keys(item)[0]}
              </Typography.Text>
            </Col>
            <Col span={6}>
              <Progress
                percent={Object.values(item)[0]}
                showInfo={false}
                strokeWidth={30}
              />
            </Col>
            <Col span={4} style={{ paddingLeft: "20px" }}>
              <Typography.Text style={{ fontSize: "18px", fontWeight: "bold" }}>
                {Object.values(item)[0]} %
              </Typography.Text>
            </Col>
          </Row>
        ))}
      </Row>
    </>
  );
};

export default PollResult;
