import React from "react";
import { Link } from "@reach/router";
import {
  Row,
  Col,
  Table,
  Spin,
  Button,
  Breadcrumb,
  Icon,
  Typography
} from "antd";
import { CSVLink } from "react-csv";

import "../../style.css";

import FirebaseContext from "../../firebase";

const ActionButtons = () => (
  <Row type="flex" justify="center" style={{ marginTop: 30, marginBottom: 30 }}>
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/Ecl1392019">Admin Home</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Feedbacks</Breadcrumb.Item>
    </Breadcrumb>
  </Row>
);

const AdminFeedback = () => {
  const { firebase } = React.useContext(FirebaseContext);
  const [docs, setDocs] = React.useState([]);
  const [message, setMessage] = React.useState(null);

  React.useEffect(() => {
    async function loadFeedbacks() {
      const db = firebase.firestore();
      const querySnapshot = await db.collection("feedbacks").get();
      return querySnapshot.docs;
    }

    let isSubscribed = true;
    if (firebase) {
      loadFeedbacks().then(docs => {
        if (isSubscribed) {
          if (docs.length === 0) {
            setMessage("No feedbacks available!");
          } else {
            setDocs(docs);
          }
        }
      });
    }

    // cleanup
    return () => (isSubscribed = false);
  }, [firebase]);

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

  if (docs.length === 0) {
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
      title: "Keynote Session Content",
      label: "Keynote Session Content",
      key: "q1aRadio",
      dataIndex: "q1aRadio"
    },
    {
      title: "Panel discussion",
      label: "Panel discussion",
      key: "q1bRadio",
      dataIndex: "q1bRadio"
    },
    {
      title: "Event length",
      label: "Event length",
      key: "q1cRadio",
      dataIndex: "q1cRadio"
    },
    {
      title: "Overall evaluation of the summit",
      label: "Overall evaluation of the summit",
      key: "q1dRadio",
      dataIndex: "q1dRadio"
    },
    {
      title: "What did you like most about the Summit?",
      label: "What did you like most about the Summit?",
      key: "q1Input1",
      dataIndex: "q1Input1"
    },
    {
      title: "What topics would you like to see covered at future engagements?",
      label: "What topics would you like to see covered at future engagements?",
      key: "q1Input2",
      dataIndex: "q1Input2"
    },
    {
      title: "Digital Transformation enabler",
      label: "Digital Transformation enabler",
      key: "q2aRadio",
      dataIndex: "q2aRadio"
    },
    {
      title: "Provider of IT solutions",
      label: "Provider of IT solutions",
      key: "q2bRadio",
      dataIndex: "q2bRadio"
    },
    {
      title: "Managed Service provider for Unified Communications",
      label: "Managed Service provider for Unified Communications",
      key: "q2cRadio",
      dataIndex: "q2cRadio"
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
      q1aRadio,
      q1bRadio,
      q1cRadio,
      q1dRadio,
      q1Input1,
      q1Input2,
      q2aRadio,
      q2bRadio,
      q2cRadio,
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
      q1aRadio,
      q1bRadio,
      q1cRadio,
      q1dRadio,
      q1Input1,
      q1Input2,
      q2aRadio,
      q2bRadio,
      q2cRadio,
      q7Radio,
      q8Radio,
      q9Radio,
      q10Radio,
      comment
    });
  });

  return (
    <>
      <ActionButtons />
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
      <Row style={{ margin: 30 }}>
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
