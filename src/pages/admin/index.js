import React from "react";
import { Router } from "@reach/router";

import "../../style.css";

import AdminFeedback from "./feedback";
import AddPoll from "./addpoll";
import PollList from "./polllist";
import PollResult from "./pollresult";
import Login from "./login";

import FirebaseContext from "../../firebase";
import Questions from "./questions";

const Admin = props => {
  const { firebase } = React.useContext(FirebaseContext);

  // User sign-in
  React.useEffect(() => {
    let unsubscribe = null;
    if (firebase) {
      unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
        if (!user) {
          props.navigate("/Ecl1392019/login");
        }
      });
    }

    return function cleanup() {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebase, props]);

  return (
    <>
      <Router>
        <Questions path="/" />
        <Login path="/login" />
        <AdminFeedback path="/feedback" />
        <AddPoll path="/addpoll" />
        <PollList path="/polllist" />
        <PollResult path="/pollresult/:pollid" />
      </Router>
    </>
  );
};

export default Admin;
