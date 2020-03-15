/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AuthLayout from '~/pages/_layouts/auth';
import DefaultLayout from '~/pages/_layouts/default';

import { setActiveNavItem } from '~/store/modules/navitem/actions';

export default function RouteWrapper({
  component: Component,
  navItem,
  isPrivate,
  ...rest
}) {
  const dispatch = useDispatch();
  const signed = useSelector(state => state.auth.signed);

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/deliveries" />;
  }

  const Layout = signed ? DefaultLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={props => {
        if (navItem) dispatch(setActiveNavItem(navItem));

        return (
          <Layout>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
  navItem: PropTypes.string,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  navItem: null,
};
