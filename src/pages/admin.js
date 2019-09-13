import React from "react";
import { Row, Table, Col, Spin } from "antd";

import FirebaseContext from "../firebase";

const Admin = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [questions, setQuestions] = React.useState([]);

  React.useEffect(() => {
    let unsubscribe = null;

    if (firebase) {
      const db = firebase.firestore();
      unsubscribe = db
        .collection("questions")
        .orderBy("createdAt", "desc")
        .onSnapshot(function(snapshot) {
          setQuestions(snapshot.docs);
        });
    }

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebase]);

  if (questions.length === 0) {
    return (
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Spin size="large" />
      </Row>
    );
  }

  const dataSource = [];
  const columns = [
    {
      title: "Question",
      key: "question",
      dataIndex: "question"
    }
  ];
  questions.forEach(doc => {
    dataSource.push({
      key: doc.id,
      question: doc.data().question
    });
  });

  return (
    <Row
      type="flex"
      justify="center"
      style={{ marginTop: 30, marginBottom: 30 }}
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
  );
};

export default Admin;
