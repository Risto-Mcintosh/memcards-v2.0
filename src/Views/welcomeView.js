import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAuthenticatedUser } from '../actions/actionCreator';
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
  return <Landing form={selectForm(props)} />;
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { setAuthenticatedUser })(welcomeView);

welcomeView.propTypes = {
  user: PropTypes.object
};

welcomeView.defaultProps = {
  user: {}
};
