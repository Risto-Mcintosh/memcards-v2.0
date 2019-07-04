import React from "react";
import LogIn from "../components/LogIn";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Loading from "../components/loading";
function welcomeView({ user }) {
  return (
    <>
      {Object.entries(user).length === 0 ? (
        <Loading />
      ) : !user.isAuthenticated ? (
        <LogIn />
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(welcomeView);
