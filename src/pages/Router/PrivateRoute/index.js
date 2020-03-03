import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';

import paths from '../paths';
import Layout from '../../../components/Layout';

const PrivateRoute = ({ path, component: Component }) => {
  const { id } = useSelector(
    state => ({
      id: state.auth.userData.id
    }),
    shallowEqual
  );

  return (
    <Layout>
      <Route
        exact
        path={path}
        render={() => id ? <Component /> : <Redirect to={paths.LOGIN} />}
      />
    </Layout>
  );
};

PrivateRoute.propType = {
  path: PropTypes.string.isRequired,
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
