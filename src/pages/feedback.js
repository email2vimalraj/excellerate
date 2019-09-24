import React from "react";
import { Link } from "@reach/router";
import {
  Row,
  Col,
  Button,
  Form,
  Input,
  Radio,
  Typography,
  Checkbox
} from "antd";

import FirebaseContext from "../firebase";

import "../style.css";

const Feedback = () => {
  const { firebase } = React.useContext(FirebaseContext);

  const [firstname, setFirstname] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [lastname, setLastname] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [jobtitle, setJobtitle] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [company, setCompany] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [contactnumber, setContactnumber] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [companyemail, setCompanyemail] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [comment, setComment] = React.useState({
    value: ""
  });

  const [q1Input1, setQ1Input1] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });
  const [q1Input2, setQ1Input2] = React.useState({
    value: "",
    validateStatus: null,
    hasFeedback: true
  });

  const [q1aRadio, setQ1aRadio] = React.useState(null);
  const [q1bRadio, setQ1bRadio] = React.useState(null);
  const [q1cRadio, setQ1cRadio] = React.useState(null);
  const [q1dRadio, setQ1dRadio] = React.useState(null);
  const [q2aRadio, setQ2aRadio] = React.useState(null);
  const [q2bRadio, setQ2bRadio] = React.useState(null);
  const [q2cRadio, setQ2cRadio] = React.useState(null);
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

  const onQ1Input1Change = e => {
    setQ1Input1({ ...q1Input1, value: e.target.value });
  };

  const onQ1Input2Change = e => {
    setQ1Input2({ ...q1Input2, value: e.target.value });
  };

  const handleQ1aRadioChange = e => {
    setQ1aRadio(e.target.value);
  };

  const handleQ1bRadioChange = e => {
    setQ1bRadio(e.target.value);
  };

  const handleQ1cRadioChange = e => {
    setQ1cRadio(e.target.value);
  };

  const handleQ1dRadioChange = e => {
    setQ1dRadio(e.target.value);
  };

  const handleQ2aRadioChange = e => {
    setQ2aRadio(e.target.value);
  };

  const handleQ2bRadioChange = e => {
    setQ2bRadio(e.target.value);
  };

  const handleQ2cRadioChange = e => {
    setQ2cRadio(e.target.value);
  };

  const handleQ7RadioChange = e => {
    setQ7Radio(e);
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
    if (q1Input1.value === "") {
      setQ1Input1({ ...q1Input1, validateStatus: "error" });
    } else {
      setQ1Input1({ ...q1Input1, validateStatus: null });
    }
    if (q1Input2.value === "") {
      setQ1Input2({ ...q1Input2, validateStatus: "error" });
    } else {
      setQ1Input2({ ...q1Input2, validateStatus: null });
    }
    console.log(q7Radio);
    if (
      !q1aRadio ||
      !q1bRadio ||
      !q1cRadio ||
      !q1dRadio ||
      !q2aRadio ||
      !q2bRadio ||
      !q2cRadio ||
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
        q1Input1: q1Input1.value,
        q1Input2: q1Input2.value,
        q1aRadio,
        q1bRadio,
        q1cRadio,
        q1dRadio,
        q2aRadio,
        q2bRadio,
        q2cRadio,
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
    <>
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 30, marginBottom: 20 }}
      >
        <Typography.Title level={2}>Let's Connect!</Typography.Title>
      </Row>
      <Row type="flex" justify="center" style={{ marginBottom: 30 }}>
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
                placeholder="Mandatory"
                id="firstname"
                onChange={onFirstnameChange}
              />
            </Form.Item>

            <Form.Item required label="Last name" {...lastname}>
              <Input
                placeholder="Mandatory"
                id="lastname"
                onChange={onLastnameChange}
              />
            </Form.Item>

            <Form.Item required label="Job title" {...jobtitle}>
              <Input
                placeholder="Mandatory"
                id="jobtitle"
                onChange={onJobtitleChange}
              />
            </Form.Item>

            <Form.Item required label="Company" {...company}>
              <Input
                placeholder="Mandatory"
                id="company"
                onChange={onCompanyChange}
              />
            </Form.Item>

            <Form.Item required label="Contact number" {...contactnumber}>
              <Input
                placeholder="Mandatory"
                id="contactnumber"
                onChange={onContactnumberChange}
              />
            </Form.Item>

            <Form.Item required label="Company email" {...companyemail}>
              <Input
                type="email"
                placeholder="Mandatory"
                id="companyemail"
                onChange={onCompanyemailChange}
              />
            </Form.Item>

            <Typography.Title
              level={4}
              style={{
                backgroundColor: "#4085c6",
                color: "#fff",
                padding: 5,
                marginTop: 30
              }}
            >
              FEEDBACK ON THE SUMMIT
            </Typography.Title>

            <>
              <Typography.Paragraph>
                Please rate the following in terms of how the event met your
                expectations.
              </Typography.Paragraph>

              <Form.Item required label="Keynote session content">
                <input
                  type="radio"
                  name="q1aRadio"
                  onChange={handleQ1aRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q1aRadio"
                  onChange={handleQ1aRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q1aRadio"
                  onChange={handleQ1aRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q1aRadio"
                  onChange={handleQ1aRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>

              <Form.Item required label="Panel discussion">
                <input
                  type="radio"
                  name="q1bRadio"
                  onChange={handleQ1bRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q1bRadio"
                  onChange={handleQ1bRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q1bRadio"
                  onChange={handleQ1bRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q1bRadio"
                  onChange={handleQ1bRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>

              <Form.Item required label="Event length">
                <input
                  type="radio"
                  name="q1cRadio"
                  onChange={handleQ1cRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q1cRadio"
                  onChange={handleQ1cRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q1cRadio"
                  onChange={handleQ1cRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q1cRadio"
                  onChange={handleQ1cRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>

              <Form.Item required label="Overall evaluation of the summit">
                <input
                  type="radio"
                  name="q1dRadio"
                  onChange={handleQ1dRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q1dRadio"
                  onChange={handleQ1dRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q1dRadio"
                  onChange={handleQ1dRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q1dRadio"
                  onChange={handleQ1dRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>

              <Form.Item
                required
                label="What did you like most about the summit?"
              >
                <Input
                  placeholder="Mandatory"
                  id="what-did-you-like-most-about-the-summit"
                  onChange={onQ1Input1Change}
                />
              </Form.Item>

              <Form.Item
                required
                label="What topics would you like to see covered at future engagements?"
              >
                <Input
                  placeholder="Mandatory"
                  id="what-topics-would-you-like-to-see-covered-at-future-engagements"
                  onChange={onQ1Input2Change}
                />
              </Form.Item>
            </>

            <>
              <Typography.Paragraph>
                Please rate the following in terms of how your perceptions has
                changed.
              </Typography.Paragraph>

              <Form.Item required label="Digital transformation enabler">
                <input
                  type="radio"
                  name="q2aRadio"
                  onChange={handleQ2aRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q2aRadio"
                  onChange={handleQ2aRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q2aRadio"
                  onChange={handleQ2aRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q2aRadio"
                  onChange={handleQ2aRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>

              <Form.Item required label="Provider of IT solutions">
                <input
                  type="radio"
                  name="q2bRadio"
                  onChange={handleQ2bRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q2bRadio"
                  onChange={handleQ2bRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q2bRadio"
                  onChange={handleQ2bRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q2bRadio"
                  onChange={handleQ2bRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>

              <Form.Item
                required
                label="Managed Service provider for Unified Communications"
              >
                <input
                  type="radio"
                  name="q2cRadio"
                  onChange={handleQ2cRadioChange}
                  value="Excellent"
                />
                &nbsp;Excellent
                <br />
                <input
                  type="radio"
                  name="q2cRadio"
                  onChange={handleQ2cRadioChange}
                  value="Good"
                />
                &nbsp;Good
                <br />
                <input
                  type="radio"
                  name="q2cRadio"
                  onChange={handleQ2cRadioChange}
                  value="Average"
                />
                &nbsp;Average
                <br />
                <input
                  type="radio"
                  name="q2cRadio"
                  onChange={handleQ2cRadioChange}
                  value="Fair"
                />
                &nbsp;Fair
                <br />
              </Form.Item>
            </>

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
              <Checkbox.Group name="q7Radio" onChange={handleQ7RadioChange}>
                <Row>
                  <Checkbox value="IoT with Mobile Network Connectivity">
                    IoT with Mobile Network Connectivity
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="Managed Hosting Services (Private Cloud, Managed Colocation, etc.)">
                    Managed Hosting Services (Private Cloud, Managed Colocation,
                    etc.)
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="Managed Security Services (SOC/SIEM, DDoS, VAPT, etc.)">
                    Managed Security Services (SOC/SIEM, DDoS, VAPT, etc.)
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="Network Connectivity (MPLS, SLA over Internet, SD-WAN, etc.)">
                    Network Connectivity (MPLS, SLA over Internet, SD-WAN, etc.)
                  </Checkbox>
                </Row>
                <Row>
                  <Checkbox value="Unified Communications as a Service (GSIP, Microsoft/Cisco, Microsoft TEAMS Direct Routing, etc.)">
                    Unified Communications as a Service (GSIP, Microsoft/Cisco,
                    Microsoft TEAMS Direct Routing, etc.)
                  </Checkbox>
                </Row>

                <Row>
                  <Checkbox value="Voice">Voice</Checkbox>
                </Row>
              </Checkbox.Group>
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
                placeholder="Optional"
                id="comment"
                onChange={onCommentChange}
                rows={3}
                cols={60}
                className="commentsBox"
                style={{ padding: 10 }}
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
    </>
  );
};

export default Feedback;
