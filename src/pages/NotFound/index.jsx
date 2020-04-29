import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';

import path from 'pages/Router/paths';
import NotFoudImage from 'assets/404.gif';
import classes from './NotFound.module.scss';

const NotFound = () => {
  const location = useLocation();

  const { isAuth } = useSelector(
    state => ({
      isAuth: !!state.auth.userData.id
    }),
    shallowEqual
  );

  const userPath = isAuth ? path.ROOT : path.LOGIN;

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <section className={`section ${classes.section}`}>
          <div className="container">
            <div className="columns is-vcentered is-desktop">
              <div className="column has-text-centered">
                <h1 className="title">Error 404: page not found</h1>
                <p className="subtitle">
                  The requested URL {location.pathname} was not found
                </p>
                <Link className="button is-info is-normal" to={userPath}>
                  Go Back
                </Link>
              </div>
              <div className="column has-text-centered">
                <img src={NotFoudImage} alt="404 error" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default NotFound;
