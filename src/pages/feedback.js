import React from "react";
import { Link } from "@reach/router";
import { Row, Col, Button, Form, Input, Radio, Typography } from "antd";

import FirebaseContext from "../firebase";

import "../style.css";

const radioStyle = {
  display: "block",
  height: "30px",
  lineHeight: "30px"
};

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
        <Row type="flex" justify="center">
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
              <Form.Item required label="First Name" {...firstname}>
                <Input
                  placeholder="Your answer"
                  id="firstname"
                  onChange={onFirstnameChange}
                />
              </Form.Item>

              <Form.Item required label="Last Name" {...lastname}>
                <Input
                  placeholder="Your answer"
                  id="lastname"
                  onChange={onLastnameChange}
                />
              </Form.Item>

              <Form.Item required label="Job Title" {...jobtitle}>
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
                <Radio.Group onChange={handleQ1RadioChange} value={q1Radio}>
                  <Radio style={radioStyle} value="Yes">
                    Yes
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="In the process of migrating to cloud-based services"
                  >
                    In the process of migrating to cloud-based services
                  </Radio>
                  <Radio style={radioStyle} value="No">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                required
                label="Have you implemented Internet breakouts at local branches to support direct access to cloud apps?"
              >
                <Radio.Group onChange={handleQ2RadioChange} value={q2Radio}>
                  <Radio style={radioStyle} value="Yes">
                    Yes
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="We are in the implementation process"
                  >
                    We are in the implementation process
                  </Radio>
                  <Radio style={radioStyle} value="No">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                required
                label="Does your current WAN solution support your digital transformation objectives?"
              >
                <Radio.Group onChange={handleQ3RadioChange} value={q3Radio}>
                  <Radio style={radioStyle} value="Yes">
                    Yes
                  </Radio>
                  <Radio style={radioStyle} value="Almost - needs some work">
                    Almost - needs some work
                  </Radio>
                  <Radio style={radioStyle} value="No">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                required
                label="Do you have a cyber security strategy in place?"
              >
                <Radio.Group onChange={handleQ4RadioChange} value={q4Radio}>
                  <Radio style={radioStyle} value="Yes">
                    Yes
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="We have one - but it is not quite right"
                  >
                    We have one - but it is not quite right
                  </Radio>
                  <Radio style={radioStyle} value="No">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                required
                label="Are roles and responsibilities for cyber security well defined across your organisation?"
              >
                <Radio.Group onChange={handleQ5RadioChange} value={q5Radio}>
                  <Radio style={radioStyle} value="Yes">
                    Yes
                  </Radio>
                  <Radio style={radioStyle} value="Needs more work">
                    Needs more work
                  </Radio>
                  <Radio style={radioStyle} value="No">
                    No
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                required
                label="Do you have the right tools in place to mitigate cyber security incidents?"
              >
                <Radio.Group onChange={handleQ6RadioChange} value={q6Radio}>
                  <Radio style={radioStyle} value="Yes">
                    Yes
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="We have tools, but they are not effective"
                  >
                    We have tools, but they are not effective
                  </Radio>
                  <Radio style={radioStyle} value="No">
                    No
                  </Radio>
                </Radio.Group>
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
              <Form.Item required label="Current Project">
                <Radio.Group onChange={handleQ7RadioChange} value={q7Radio}>
                  <Radio
                    style={radioStyle}
                    value="IoT with Mobile Network Connectivity"
                  >
                    IoT with Mobile Network Connectivity
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="Managed Hosting Services (Private Cloud, Managed Colocation, etc.)"
                  >
                    Managed Hosting Services (Private Cloud, Managed Colocation,
                    etc.)
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="Managed Security Services (SOC/SIEM, DDoS, VAPT, etc.)"
                  >
                    Managed Security Services (SOC/SIEM, DDoS, VAPT, etc.)
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="Network Connectivity (MPLS, SLA over Internet, SD-WAN, etc.)"
                  >
                    Network Connectivity (MPLS, SLA over Internet, SD-WAN, etc.)
                  </Radio>
                  <Radio
                    style={radioStyle}
                    value="Unified Communications as a Service (GSIP, Microsoft/Cisco, Microsoft TEAMS Direct Routing, etc.)"
                  >
                    Unified Communications as a Service (GSIP, Microsoft/Cisco,
                    Microsoft TEAMS Direct Routing, etc.)
                  </Radio>
                  <Radio style={radioStyle} value="Voice">
                    Voice
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                required
                label="What is your selected project timeline?"
              >
                <Radio.Group onChange={handleQ8RadioChange} value={q8Radio}>
                  <Radio style={radioStyle} value="Immediate">
                    Immediate
                  </Radio>
                  <Radio style={radioStyle} value="1-3 months">
                    1-3 months
                  </Radio>
                  <Radio style={radioStyle} value="3-6 months">
                    3-6 months
                  </Radio>
                  <Radio style={radioStyle} value="More than 6 months">
                    More than 6 months
                  </Radio>
                  <Radio style={radioStyle} value="Other">
                    Other&nbsp;&nbsp;&nbsp;
                    {q8Radio &&
                      (q8Radio === "Other" ||
                        q8Radio.startsWith("Other - ")) && (
                        <Input onChange={handleOtherForQ8} />
                      )}
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item required label="What is your project budget?">
                <Radio.Group onChange={handleQ9RadioChange} value={q9Radio}>
                  <Radio style={radioStyle} value="US$10,000">
                    US$10,000
                  </Radio>
                  <Radio style={radioStyle} value="US$10,001 - US$50,000">
                    US$10,001 - US$50,000
                  </Radio>
                  <Radio style={radioStyle} value="US$50,001 - US$100,000">
                    US$50,001 - US$100,000
                  </Radio>
                  <Radio style={radioStyle} value="Above US$100,0001">
                    Above US$100,0001
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item required label="What is your role in the project?">
                <Radio.Group onChange={handleQ10RadioChange} value={q10Radio}>
                  <Radio style={radioStyle} value="Decision Maker">
                    Decision Maker
                  </Radio>
                  <Radio style={radioStyle} value="Project Manager">
                    Project Manager
                  </Radio>
                  <Radio style={radioStyle} value="Influencer">
                    Influencer
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="Please share with us an overview of your project/requirements">
                <textarea
                  placeholder="Your answer"
                  id="comment"
                  onChange={onCommentChange}
                  rows={3}
                  cols={60}
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
                  <Typography.Text type="danger">
                    {errorMessage}
                  </Typography.Text>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Feedback;
