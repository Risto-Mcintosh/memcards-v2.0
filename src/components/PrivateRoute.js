/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

function PrivateRoute({ component: Component, user, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !user.isAuthenticated ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(PrivateRoute);

PrivateRoute.propTypes = {
  component: PropTypes.any,
  user: PropTypes.object.isRequired
};
