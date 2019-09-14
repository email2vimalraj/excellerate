import React from "react";
import { Router, Link } from "@reach/router";
import { Row, Col } from "antd";

import HeaderImage from "./assets/header.png";
import FooterImage from "./assets/footer.png";

import Home from "./pages/home";
import Question from "./pages/question";
import Feedback from "./pages/feedback";
import Admin from "./pages/admin";
import AdminFeedback from "./pages/admin/feedback";

import "./style.css";
import Poll from "./pages/poll";
import AddPoll from "./pages/admin/addpoll";
import PollList from "./pages/admin/polllist";
import PollResult from "./pages/admin/pollresult";

function App() {
  return (
    <>
      <Row justify="center" type="flex">
        <Col>
          <Link to="/">
            <img
              className="logo"
              src={HeaderImage}
              alt="Excellerate - Tata Communications"
            />
          </Link>
        </Col>
      </Row>

      <Router>
        <Home path="/" />
        <Question path="question" />
        <Feedback path="feedback" />
        <Poll path="poll" />
        <Admin path="Ecl1392019" />
        <AdminFeedback path="/Ecl1392019/feedback" />
        <AddPoll path="/Ecl1392019/addpoll" />
        <PollList path="/Ecl1392019/polllist" />
        <PollResult path="/Ecl1392019/pollresult/:pollid" />
      </Router>

      <Row>
        <img className="footerimage" src={FooterImage} alt="Footer Design" />
      </Row>
    </>

    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <Link className="App-link" to="question">
    //       Question
    //     </Link>
    //     <Link className="App-link" to="feedback">
    //       Feedback
    //     </Link>
    //   </header>

    //   <>
    //     <Router>
    //       <Question path="question" />
    //       <Feedback path="feedback" />
    //       <Admin path="admin" />
    //     </Router>
    //   </>
    // </div>
  );
}

export default App;
