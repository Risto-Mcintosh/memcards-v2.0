/* eslint-disable no-nested-ternary */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LogIn from '../components/LogIn';
import Loading from '../components/loading';

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

welcomeView.propTypes = {
  user: PropTypes.object
};

welcomeView.defaultProps = {
  user: {}
};
