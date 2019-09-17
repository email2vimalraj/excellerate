import React from "react";
import {
  Row,
  Table,
  Col,
  Spin,
  Button,
  Breadcrumb,
  Typography,
  Radio
} from "antd";

import "../../style.css";

import FirebaseContext from "../../firebase";

const ActionButtons = () => (
  <>
    <Row
      type="flex"
      justify="center"
      style={{ marginTop: 30, marginBottom: 30 }}
    >
      <Breadcrumb>
        <Breadcrumb.Item>Admin Home</Breadcrumb.Item>
      </Breadcrumb>
    </Row>
    <Row type="flex" justify="end" style={{ marginTop: 30 }}>
      <Col span={12}>
        <Button size="large" className="button" href="/Ecl1392019/feedback">
          Feedbacks
        </Button>
        <Button size="large" className="button" href="/Ecl1392019/addpoll">
          Add Poll
        </Button>
        <Button size="large" className="button" href="/Ecl1392019/polllist">
          Poll List
        </Button>
      </Col>
    </Row>
  </>
);

const Admin = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [questions, setQuestions] = React.useState([]);
  const [message, setMessage] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState("All");

  React.useEffect(() => {
    let unsubscribe = null;

    if (firebase) {
      const db = firebase.firestore();
      console.log(selectedOption);
      if (selectedOption === "All") {
        unsubscribe = db
          .collection("questions")
          .orderBy("createdAt", "desc")
          .onSnapshot(function(snapshot) {
            if (snapshot.docs.length === 0) {
              setMessage("No questions available!");
            } else {
              setQuestions(snapshot.docs);
            }
          });
      } else {
        unsubscribe = db
          .collection("questions")
          .where("selectedOption", "==", selectedOption)
          .orderBy("createdAt", "desc")
          .onSnapshot(function(snapshot) {
            if (snapshot.docs.length === 0) {
              setMessage("No questions available!");
            } else {
              setQuestions(snapshot.docs);
            }
          });
      }
    }

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebase, selectedOption]);

  const optionChange = e => {
    setSelectedOption(e.target.value);
  };

  if (message) {
    return (
      <>
        <ActionButtons />
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: 30, marginBottom: 30 }}
        >
          <Typography.Title level={2}>{message}</Typography.Title>
        </Row>
      </>
    );
  }

  if (questions.length === 0) {
    return (
      <>
        <ActionButtons />
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: 30, marginBottom: 30 }}
        >
          <Spin size="large" />
        </Row>
      </>
    );
  }

  const dataSource = [];
  const columns = [
    {
      title: "S. No.",
      key: "no",
      dataIndex: "no"
    },
    {
      title: "Question",
      key: "question",
      dataIndex: "question"
    }
  ];
  questions.forEach((doc, idx) => {
    dataSource.push({
      key: doc.id,
      question: doc.data().question,
      no: idx + 1
    });
  });

  return (
    <>
      <ActionButtons />
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Radio.Group onChange={optionChange} value={selectedOption}>
          <Radio value="All">All</Radio>
          <Radio value="Modern Workplace">Modern Workplace</Radio>
          <Radio value="IoT">IoT</Radio>
          <Radio value="Hybrid IT">Hybrid IT</Radio>
        </Radio.Group>
      </Row>
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 20, marginBottom: 30 }}
      >
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={dataSource}
            bordered
            pagination={false}
          />
        </Col>
      </Row>
    </>
  );
};

export default Admin;
