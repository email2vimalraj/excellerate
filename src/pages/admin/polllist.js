import React from "react";
import { Link } from "@reach/router";
import { Row, Col, Spin, Button, Divider, Breadcrumb } from "antd";

import "../../style.css";

import FirebaseContext from "../../firebase";

const PollList = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [docs, setDocs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refetch, setRefetch] = React.useState(0);

  React.useEffect(() => {
    async function loadPolls() {
      const db = firebase.firestore();
      const qs = await db.collection("polls").get();
      setDocs(qs.docs);
    }

    if (firebase) {
      loadPolls();
    }
  }, [firebase, refetch]);

  if (docs.length === 0) {
    return <Spin size="large" />;
  }

  const handleUpdate = async (id, freeze) => {
    setLoading(true);
    const db = firebase.firestore();
    await db
      .collection("polls")
      .doc(id)
      .update({ freeze });
    setRefetch(refetch + 1);
    setLoading(false);
  };

  return (
    <>
      <Row type="flex" justify="center" style={{ marginTop: "30px" }}>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/Ecl1392019">Admin Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Poll List</Breadcrumb.Item>
        </Breadcrumb>
      </Row>

      {docs.map(doc => {
        return (
          <Row
            key={doc.id}
            type="flex"
            justify="center"
            style={{ marginTop: 30, marginBottom: 30 }}
          >
            <Col span={6}>
              <Link to={`/Ecl1392019/pollresult/${doc.id}`}>
                {doc.data().question}
              </Link>
            </Col>
            <Col span={2}>
              {doc.data().freeze ? (
                <Button
                  type="danger"
                  onClick={() => handleUpdate(doc.id, false)}
                  loading={loading}
                >
                  Open
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={() => handleUpdate(doc.id, true)}
                  loading={loading}
                >
                  Close
                </Button>
              )}
            </Col>
            <Divider />
          </Row>
        );
      })}
    </>
  );
};

export default PollList;
