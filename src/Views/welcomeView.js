import React from "react";
import Welcome from "../components/Welcome";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";

function welcomeView({ user }) {
  return (
    <>
      {Object.entries(user).length === 0 ? (
        <div className=" vh-100 bg-primary">
          <h3>Loading....</h3>
        </div>
      ) : !user.isAuthenticated ? (
        <Welcome />
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
