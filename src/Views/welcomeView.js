import React from 'react';
import { Redirect } from 'react-router-dom';
import Landing from '../components/landing/Landing';
import LogInForm from '../components/landing/LogInForm';
import RegisterForm from '../components/landing/RegisterForm';
import Loading from '../components/loading';

function selectForm(props) {
  switch (props.match.path) {
    case '/register':
      return <RegisterForm {...props} />;
    default:
      return <LogInForm {...props} />;
  }
}

function WelcomeView({ user, ...props }) {
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

export default WelcomeView;
