import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setAuthenticatedUser, hydrate } from '../actions/actionCreator';
import Landing from '../components/landing/Landing';
import LogInForm from '../components/landing/LogInForm';
import RegisterForm from '../components/landing/RegisterForm';
import Loading from '../components/loading';

function selectForm(props) {
  console.log(props.match.path);
  switch (props.match.path) {
    case '/register':
      return <RegisterForm {...props} />;
    default:
      return <LogInForm {...props} />;
  }
}

function welcomeView({ user, ...props }) {
  console.log('user:', user);
  return (
    <>
      {!Object.entries(user).length ? (
        <Loading loader />
      ) : !user.isAuthenticated ? (
        <Landing form={selectForm(props)} />
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

export default connect(mapStateToProps, { setAuthenticatedUser, hydrate })(
  welcomeView
);

welcomeView.propTypes = {
  user: PropTypes.object
};

welcomeView.defaultProps = {
  user: {}
};
