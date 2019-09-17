import React from "react";
import { Row, Col, Form, Input, Icon, Button, Typography } from "antd";

import FirebaseContext from "../../firebase";

import "../../style.css";

const Login = props => {
  const { firebase } = React.useContext(FirebaseContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();

    // Handle errors
    if (email === "" || password === "") {
      setErrorMessage("Fields cannot be empty!");
      return;
    }

    const auth = firebase.auth();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      props.navigate("/Ecl1392019");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <Row
      type="flex"
      justify="center"
      style={{ marginTop: 80, marginBottom: 80 }}
    >
      <Col>
        {errorMessage && (
          <Typography.Text type="danger">{errorMessage}</Typography.Text>
        )}
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Item required>
            <Input
              prefix={
                <Icon type="mail" style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              placeholder="Email"
              onChange={handleEmailChange}
            />
          </Form.Item>
          <Form.Item required>
            <Input
              prefix={
                <Icon type="lock" style={{ color: "rgba(0, 0, 0, 0.25)" }} />
              }
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleSubmit}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
