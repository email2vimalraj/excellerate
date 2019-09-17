import React from "react";
import { Link } from "@reach/router";
import { Row, Col, Button, Form, Input, Radio, Typography } from "antd";

import FirebaseContext from "../firebase";

import "../style.css";

const Feedback = () => {
  const { firebase } = React.useContext(FirebaseContext);

  const [firstname, setFirstname] = React.useState({
    value: "",
    validateStatus: null,
    help: "This is a required question",
    hasFeedback: true
  });
  const [lastname, setLastname] = React.useState({
    value: "",
    validateStatus: null,
    help: "This is a required question",
    hasFeedback: true
  });
  const [jobtitle, setJobtitle] = React.useState({
    value: "",
    validateStatus: null,
    help: "This is a required question",
    hasFeedback: true
  });
  const [company, setCompany] = React.useState({
    value: "",
    validateStatus: null,
    help: "This is a required question",
    hasFeedback: true
  });
  const [contactnumber, setContactnumber] = React.useState({
    value: "",
    validateStatus: null,
    help: "This is a required question",
    hasFeedback: true
  });
  const [companyemail, setCompanyemail] = React.useState({
    value: "",
    validateStatus: null,
    help: "This is a required question",
    hasFeedback: true
  });
  const [comment, setComment] = React.useState({
    value: ""
  });

  const [q1Radio, setQ1Radio] = React.useState(null);
  const [q2Radio, setQ2Radio] = React.useState(null);
  const [q3Radio, setQ3Radio] = React.useState(null);
  const [q4Radio, setQ4Radio] = React.useState(null);
  const [q5Radio, setQ5Radio] = React.useState(null);
  const [q6Radio, setQ6Radio] = React.useState(null);
  const [q7Radio, setQ7Radio] = React.useState(null);
  const [q8Radio, setQ8Radio] = React.useState(null);
  const [q9Radio, setQ9Radio] = React.useState(null);
  const [q10Radio, setQ10Radio] = React.useState(null);

  const [errorMessage, setErrorMessage] = React.useState(null);
  const [submitted, setSubmitted] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onFirstnameChange = e => {
    setFirstname({ ...firstname, value: e.target.value });
  };

  const onLastnameChange = e => {
    setLastname({ ...lastname, value: e.target.value });
  };

  const onJobtitleChange = e => {
    setJobtitle({ ...jobtitle, value: e.target.value });
  };

  const onCompanyChange = e => {
    setCompany({ ...company, value: e.target.value });
  };

  const onContactnumberChange = e => {
    setContactnumber({ ...contactnumber, value: e.target.value });
  };

  const onCompanyemailChange = e => {
    setCompanyemail({ ...companyemail, value: e.target.value });
  };

  const onCommentChange = e => {
    setComment({ ...comment, value: e.target.value });
  };

  const handleQ1RadioChange = e => {
    setQ1Radio(e.target.value);
  };

  const handleQ2RadioChange = e => {
    setQ2Radio(e.target.value);
  };

  const handleQ3RadioChange = e => {
    setQ3Radio(e.target.value);
  };

  const handleQ4RadioChange = e => {
    setQ4Radio(e.target.value);
  };

  const handleQ5RadioChange = e => {
    setQ5Radio(e.target.value);
  };

  const handleQ6RadioChange = e => {
    setQ6Radio(e.target.value);
  };

  const handleQ7RadioChange = e => {
    setQ7Radio(e.target.value);
  };

  const handleQ8RadioChange = e => {
    setQ8Radio(e.target.value);
  };

  const handleOtherForQ8 = e => {
    setQ8Radio(`Other - ${e.target.value}`);
  };

  const handleQ9RadioChange = e => {
    setQ9Radio(e.target.value);
  };

  const handleQ10RadioChange = e => {
    setQ10Radio(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    let errorFlag = false;
    if (firstname.value === "") {
      setFirstname({ ...firstname, validateStatus: "error" });
      errorFlag = true;
    } else {
      setFirstname({ ...firstname, validateStatus: null });
    }
    if (lastname.value === "") {
      setLastname({ ...lastname, validateStatus: "error" });
      errorFlag = true;
    } else {
      setLastname({ ...lastname, validateStatus: null });
    }
    if (jobtitle.value === "") {
      setJobtitle({ ...jobtitle, validateStatus: "error" });
      errorFlag = true;
    } else {
      setJobtitle({ ...jobtitle, validateStatus: null });
    }
    if (company.value === "") {
      setCompany({ ...company, validateStatus: "error" });
      errorFlag = true;
    } else {
      setCompany({ ...company, validateStatus: null });
    }
    if (contactnumber.value === "") {
      setContactnumber({ ...contactnumber, validateStatus: "error" });
      errorFlag = true;
    } else {
      setContactnumber({ ...contactnumber, validateStatus: null });
    }
    if (companyemail.value === "") {
      setCompanyemail({ ...companyemail, validateStatus: "error" });
      errorFlag = true;
    } else {
      setCompanyemail({ ...companyemail, validateStatus: null });
    }
    if (
      !q1Radio ||
      !q2Radio ||
      !q3Radio ||
      !q4Radio ||
      !q5Radio ||
      !q6Radio ||
      !q7Radio ||
      !q8Radio ||
      !q9Radio ||
      !q10Radio
    ) {
      errorFlag = true;
    }
    if (errorFlag) {
      setErrorMessage("Required fields are missing");
      return;
    }
    setErrorMessage(null);

    const db = firebase.firestore();

    try {
      setLoading(true);
      const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        jobtitle: jobtitle.value,
        company: company.value,
        contactnumber: contactnumber.value,
        companyemail: companyemail.value,
        comment: comment.value,
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
      };
      await db.collection("feedbacks").add(data);
      setSubmitted(true);
      setLoading(false);
    } catch (error) {
      setErrorMessage("Error while saving the feedback. Please try again!");
    }
  };

  if (submitted) {
    return (
      <>
        <Row
          justify="center"
          type="flex"
          style={{ marginTop: 30, marginBottom: 10 }}
        >
          <Typography.Title level={2}>
            Thank you for submitting the question!
          </Typography.Title>
        </Row>
        <Row justify="center" type="flex" style={{ marginBottom: 30 }}>
          <Link to="/">Go back to Home</Link>
        </Row>
      </>
    );
  }

  return (
    <Row
      type="flex"
      justify="center"
      style={{ marginTop: 30, marginBottom: 30 }}
    >
      <Col span={18}>
        {errorMessage && (
          <Typography.Text type="danger">{errorMessage}</Typography.Text>
        )}
        <Form onSubmit={handleSubmit}>
          <Typography.Title
            level={4}
            style={{
              backgroundColor: "#4085c6",
              color: "#fff",
              padding: 5
            }}
          >
            CUSTOMER / COMPANY DETAILS
          </Typography.Title>
          <Typography.Text type="secondary">
            All information provided will be kept confidential
          </Typography.Text>
          <Form.Item required label="First name" {...firstname}>
            <Input
              placeholder="Your answer"
              id="firstname"
              onChange={onFirstnameChange}
            />
          </Form.Item>

          <Form.Item required label="Last name" {...lastname}>
            <Input
              placeholder="Your answer"
              id="lastname"
              onChange={onLastnameChange}
            />
          </Form.Item>

          <Form.Item required label="Job title" {...jobtitle}>
            <Input
              placeholder="Your answer"
              id="jobtitle"
              onChange={onJobtitleChange}
            />
          </Form.Item>

          <Form.Item required label="Company" {...company}>
            <Input
              placeholder="Your answer"
              id="company"
              onChange={onCompanyChange}
            />
          </Form.Item>

          <Form.Item required label="Contact number" {...contactnumber}>
            <Input
              placeholder="Your answer"
              id="contactnumber"
              onChange={onContactnumberChange}
            />
          </Form.Item>

          <Form.Item required label="Company email" {...companyemail}>
            <Input
              type="email"
              placeholder="Your answer"
              id="companyemail"
              onChange={onCompanyemailChange}
            />
          </Form.Item>

          <Form.Item
            required
            label="Have you migrated your applications and workloads to cloud-based services?"
          >
            <input
              type="radio"
              name="q1Radio"
              onChange={handleQ1RadioChange}
              value="Yes"
            />
            &nbsp;Yes
            <br />
            <input
              type="radio"
              name="q1Radio"
              onChange={handleQ1RadioChange}
              value="In the process of migrating to cloud-based services"
            />
            &nbsp;In the process of migrating to cloud-based services
            <br />
            <input
              type="radio"
              name="q1Radio"
              onChange={handleQ1RadioChange}
              value="No"
            />
            &nbsp;No
            <br />
          </Form.Item>

          <Form.Item
            required
            label="Have you implemented internet breakouts at local branches to support direct access to cloud apps?"
          >
            <input
              type="radio"
              onChange={handleQ2RadioChange}
              name="q2Radio"
              value="Yes"
            />
            &nbsp;Yes
            <br />
            <input
              type="radio"
              onChange={handleQ2RadioChange}
              name="q2Radio"
              value="We are in the implementation process"
            />
            &nbsp;We are in the implementation process
            <br />
            <input
              type="radio"
              onChange={handleQ2RadioChange}
              name="q2Radio"
              value="No"
            />
            &nbsp;No
            <br />
          </Form.Item>

          <Form.Item
            required
            label="Does your current WAN solution support your digital transformation objectives?"
          >
            <input
              type="radio"
              name="q3Radio"
              onChange={handleQ3RadioChange}
              value="Yes"
            />
            &nbsp;Yes
            <br />
            <input
              type="radio"
              name="q3Radio"
              onChange={handleQ3RadioChange}
              value="Almost - needs some work"
            />
            &nbsp;Almost - needs some work
            <br />
            <input
              type="radio"
              name="q3Radio"
              onChange={handleQ3RadioChange}
              value="No"
            />
            &nbsp;No
            <br />
          </Form.Item>

          <Form.Item
            required
            label="Do you have a cyber security strategy in place?"
          >
            <input
              type="radio"
              name="q4Radio"
              onChange={handleQ4RadioChange}
              value="Yes"
            />
            &nbsp;Yes
            <br />
            <input
              type="radio"
              name="q4Radio"
              onChange={handleQ4RadioChange}
              value="We have one - but it is not quite right"
            />
            &nbsp;We have one - but it is not quite right
            <br />
            <input
              type="radio"
              name="q4Radio"
              onChange={handleQ4RadioChange}
              value="No"
            />
            &nbsp;No
            <br />
          </Form.Item>

          <Form.Item
            required
            label="Are roles and responsibilities for cyber security well defined across your organisation?"
          >
            <input
              type="radio"
              name="q5Radio"
              onChange={handleQ5RadioChange}
              value="Yes"
            />
            &nbsp;Yes
            <br />
            <input
              type="radio"
              name="q5Radio"
              onChange={handleQ5RadioChange}
              value="Needs more work"
            />
            &nbsp;Needs more work
            <br />
            <input
              type="radio"
              name="q5Radio"
              onChange={handleQ5RadioChange}
              value="No"
            />
            &nbsp;No
            <br />
          </Form.Item>

          <Form.Item
            required
            label="Do you have the right tools in place to mitigate cyber security incidents?"
          >
            <input
              type="radio"
              name="q6Radio"
              onChange={handleQ6RadioChange}
              value="Yes"
            />
            &nbsp;Yes
            <br />
            <input
              type="radio"
              name="q6Radio"
              onChange={handleQ6RadioChange}
              value="We have tools, but they are not effective"
            />
            &nbsp;We have tools, but they are not effective
            <br />
            <input
              type="radio"
              name="q6Radio"
              onChange={handleQ6RadioChange}
              value="No"
            />
            &nbsp;No
            <br />
          </Form.Item>

          {/* Project Information */}
          <Typography.Title
            level={4}
            style={{
              backgroundColor: "#4085c6",
              color: "#fff",
              padding: 5
            }}
          >
            PROJECT INFORMATION
          </Typography.Title>
          <Typography.Text type="secondary">
            All information provided will be kept confidential
          </Typography.Text>
          <Form.Item required label="Current project">
            <input
              type="radio"
              name="q7Radio"
              onChange={handleQ7RadioChange}
              value="IoT with Mobile Network Connectivity"
            />
            &nbsp;IoT with Mobile Network Connectivity
            <br />
            <input
              type="radio"
              name="q7Radio"
              onChange={handleQ7RadioChange}
              value="Managed Hosting Services (Private Cloud, Managed Colocation, etc.)"
            />
            &nbsp;Managed Hosting Services (Private Cloud, Managed Colocation,
            etc.)
            <br />
            <input
              type="radio"
              name="q7Radio"
              onChange={handleQ7RadioChange}
              value="Managed Security Services (SOC/SIEM, DDoS, VAPT, etc.)"
            />
            &nbsp;Managed Security Services (SOC/SIEM, DDoS, VAPT, etc.)
            <br />
            <input
              type="radio"
              name="q7Radio"
              onChange={handleQ7RadioChange}
              value="Network Connectivity (MPLS, SLA over Internet, SD-WAN, etc.)"
            />
            &nbsp;Network Connectivity (MPLS, SLA over Internet, SD-WAN, etc.)
            <br />
            <input
              type="radio"
              name="q7Radio"
              onChange={handleQ7RadioChange}
              value="Unified Communications as a Service (GSIP, Microsoft/Cisco, Microsoft TEAMS Direct Routing, etc.)"
            />
            &nbsp;Unified Communications as a Service (GSIP, Microsoft/Cisco,
            Microsoft TEAMS Direct Routing, etc.)
            <br />
            <input
              type="radio"
              name="q7Radio"
              onChange={handleQ7RadioChange}
              value="Voice"
            />
            &nbsp;Voice
            <br />
          </Form.Item>

          <Form.Item required label="What is your selected project timeline?">
            <input
              type="radio"
              name="q8Radio"
              onChange={handleQ8RadioChange}
              value="Immediate"
            />
            &nbsp;Immediate
            <br />
            <input
              type="radio"
              name="q8Radio"
              onChange={handleQ8RadioChange}
              value="1-3 months"
            />
            &nbsp;1-3 months
            <br />
            <input
              type="radio"
              name="q8Radio"
              onChange={handleQ8RadioChange}
              value="3-6 months"
            />
            &nbsp;3-6 months
            <br />
            <input
              type="radio"
              name="q8Radio"
              onChange={handleQ8RadioChange}
              value="More than 6 months"
            />
            &nbsp;More than 6 months
            <br />
            <input
              type="radio"
              name="q8Radio"
              onChange={handleQ8RadioChange}
              value="Other"
            />
            &nbsp;Other&nbsp;&nbsp;&nbsp;
            {q8Radio &&
              (q8Radio === "Other" || q8Radio.startsWith("Other - ")) && (
                <Input onChange={handleOtherForQ8} />
              )}
            <br />
          </Form.Item>

          <Form.Item required label="What is your project budget?">
            <input
              type="radio"
              name="q9Radio"
              onChange={handleQ9RadioChange}
              value="US$10,000"
            />
            &nbsp;US$10,000
            <br />
            <input
              type="radio"
              name="q9Radio"
              onChange={handleQ9RadioChange}
              value="US$10,001 - US$50,000"
            />
            &nbsp;US$10,001 - US$50,000
            <br />
            <input
              type="radio"
              name="q9Radio"
              onChange={handleQ9RadioChange}
              value="US$50,001 - US$100,000"
            />
            &nbsp;US$50,001 - US$100,000
            <br />
            <input
              type="radio"
              name="q9Radio"
              onChange={handleQ9RadioChange}
              value="Above US$100,0001"
            />
            &nbsp;Above US$100,0001
            <br />
          </Form.Item>

          <Form.Item required label="What is your role in the project?">
            <Radio.Group onChange={handleQ10RadioChange} value={q10Radio}>
              <input
                type="radio"
                name="q10Radio"
                onChange={handleQ10RadioChange}
                value="Decision Maker"
              />
              &nbsp;Decision Maker
              <br />
              <input
                type="radio"
                name="q10Radio"
                onChange={handleQ10RadioChange}
                value="Project Manager"
              />
              &nbsp;Project Manager
              <br />
              <input
                type="radio"
                name="q10Radio"
                onChange={handleQ10RadioChange}
                value="Influencer"
              />
              &nbsp;Influencer
              <br />
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Please share with us an overview of your project/requirements">
            <textarea
              placeholder="Your answer"
              id="comment"
              onChange={onCommentChange}
              rows={3}
              cols={60}
              className="commentsBox"
            />
          </Form.Item>

          <div style={{ marginTop: 24 }}>
            <Button
              htmlType="submit"
              className="button"
              onClick={handleSubmit}
              loading={loading}
            >
              Submit
            </Button>
            {errorMessage && (
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            )}
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default Feedback;
