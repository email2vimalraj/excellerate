import React from "react";
import { Link } from "@reach/router";
import { Row, Col, Table, Spin, Button, Breadcrumb, Icon } from "antd";
import { CSVLink } from "react-csv";

import "../../style.css";

import FirebaseContext from "../../firebase";

const AdminFeedback = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [docs, setDocs] = React.useState([]);

  React.useEffect(() => {
    async function loadFeedbacks() {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("feedbacks").get();
      setDocs(querySnapshot.docs);
    }

    if (firebase) {
      loadFeedbacks();
    }
  }, [firebase]);

  if (docs.length === 0) {
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
      title: "S. No.",
      label: "S. No.",
      key: "no",
      dataIndex: "no"
    },
    {
      title: "Name",
      label: "Name",
      key: "name",
      dataIndex: "name"
    },
    {
      title: "Job Title",
      label: "Job Title",
      key: "jobtitle",
      dataIndex: "jobtitle"
    },
    {
      title: "Company",
      label: "Company",
      key: "company",
      dataIndex: "company"
    },
    {
      title: "Contact Number",
      label: "Contact Number",
      key: "contactnumber",
      dataIndex: "contactnumber"
    },
    {
      title: "Email",
      label: "Email",
      key: "companyemail",
      dataIndex: "companyemail"
    },
    {
      title:
        "Have you migrated your applications and workloads to cloud-based services?",
      label:
        "Have you migrated your applications and workloads to cloud-based services?",
      key: "q1Radio",
      dataIndex: "q1Radio"
    },
    {
      title:
        "Have you implemented Internet breakouts at local branches to support direct access to cloud apps?",
      label:
        "Have you implemented Internet breakouts at local branches to support direct access to cloud apps?",
      key: "q2Radio",
      dataIndex: "q2Radio"
    },
    {
      title:
        "Does your current WAN solution support your digital transformation objectives?",
      label:
        "Does your current WAN solution support your digital transformation objectives?",
      key: "q3Radio",
      dataIndex: "q3Radio"
    },
    {
      title: "Do you have a cyber security strategy in place?",
      label: "Do you have a cyber security strategy in place?",
      key: "q4Radio",
      dataIndex: "q4Radio"
    },
    {
      title:
        "Are roles and responsibilities for cyber security well defined across your organisation?",
      label:
        "Are roles and responsibilities for cyber security well defined across your organisation?",
      key: "q5Radio",
      dataIndex: "q5Radio"
    },
    {
      title:
        "Do you have the right tools in place to mitigate cyber security incidents?",
      label:
        "Do you have the right tools in place to mitigate cyber security incidents?",
      key: "q6Radio",
      dataIndex: "q6Radio"
    },
    {
      title: "Current Project",
      label: "Current Project",
      key: "q7Radio",
      dataIndex: "q7Radio"
    },
    {
      title: "What is your selected project timeline?",
      label: "What is your selected project timeline?",
      key: "q8Radio",
      dataIndex: "q8Radio"
    },
    {
      title: "What is your project budget",
      label: "What is your project budget",
      key: "q9Radio",
      dataIndex: "q9Radio"
    },
    {
      title: "What is your role in the project?",
      label: "What is your role in the project?",
      key: "q10Radio",
      dataIndex: "q10Radio"
    },
    {
      title: "Comment",
      label: "Comment",
      key: "comment",
      dataIndex: "comment"
    }
  ];
  docs.forEach((doc, idx) => {
    const {
      firstname,
      lastname,
      jobtitle,
      company,
      contactnumber,
      companyemail,
      comment,
      q1Radio,
      q2Radio,
      q3Radio,
      q4Radio,
      q5Radio,
      q6Radio,
      q7Radio,
      q8Radio,
      q9Radio,
      q10Radio
    } = doc.data();

    dataSource.push({
      key: doc.id,
      no: idx + 1,
      name: `${lastname}, ${firstname}`,
      jobtitle,
      company,
      contactnumber,
      companyemail,
      q1Radio,
      q2Radio,
      q3Radio,
      q4Radio,
      q5Radio,
      q6Radio,
      q7Radio,
      q8Radio,
      q9Radio,
      q10Radio,
      comment
    });
  });

  return (
    <>
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/Ecl1392019">Admin Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Feedbacks</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        <Col span={12}>
          <Button size="large" className="button" href="/Ecl1392019">
            Questions
          </Button>
          <CSVLink
            data={dataSource}
            headers={columns}
            filename={`feedbacks-${Date.now()}.csv`}
            style={{ marginBottom: 10 }}
            className="ant-btn button ant-btn-lg"
          >
            <Icon type="download" />
            &nbsp;Download
          </CSVLink>
        </Col>
      </Row>
      <Row style={{ marginTop: 30, marginBottom: 30 }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
        />
      </Row>
    </>
  );
};

export default AdminFeedback;
