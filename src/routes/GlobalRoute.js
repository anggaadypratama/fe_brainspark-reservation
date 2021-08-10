import React from 'react';
import { Redirect, Route } from 'react-router';
import { PropTypes } from 'prop-types';

const GlobalRoute = ({ Component, isPrivate, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isPrivate
      ? <Redirect to="/dashboard" />
      : <Component {...rest} {...props} />)}
  />
);

GlobalRoute.propTypes = {
  Component: PropTypes.node.isRequired,
  isPrivate: PropTypes.bool,
  rest: PropTypes.oneOfType([PropTypes.objectOf(PropTypes.object)]),
};

GlobalRoute.defaultProps = {
  isPrivate: false,
  rest: {},
};

export default GlobalRoute;
