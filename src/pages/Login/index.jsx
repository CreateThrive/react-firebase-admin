import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import firebase from 'firebase';
import { auth, setPassword, authCleanUp } from 'state/actions/auth';
import { useChangeHandler } from 'utils/hooks';
import { inputValidations } from 'utils';
import paths from '../Router/paths';
import classes from './Login.module.scss';

const Login = () => {
  const { error, isAuth, loading } = useSelector(
    state => ({
      error: state.auth.error,
      isAuth: !!state.auth.userData.id,
      loading: state.auth.loading
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [authData, setAuthData] = useState({
    email: '',
    password: ''
  });

  const onChangeHandler = useChangeHandler(setAuthData);

  useEffect(() => {
    document.documentElement.classList.remove(
      'has-aside-left',
      'has-navbar-fixed-top'
    );
    return () => {
      document.documentElement.classList.add(
        'has-aside-left',
        'has-navbar-fixed-top'
      );
      dispatch(authCleanUp());
    };
  }, [dispatch]);

  const isEmailLink = firebase
    .auth()
    .isSignInWithEmailLink(window.location.href);

  const onSubmitHandler = event => {
    event.preventDefault();

    if (isEmailLink) {
      dispatch(
        setPassword(authData.email, authData.password, window.location.href)
      );
    } else {
      dispatch(auth(authData.email, authData.password));
    }
  };

  const modifierLoading = loading && 'is-loading';

  const inputs = isEmailLink
    ? inputValidations(authData.email, authData.password)
    : {
        email: {
          modifier: null,
          message: null
        },
        password: {
          modifier: null,
          message: null
        },
        canSubmit: false
      };

  const redirect = isAuth && <Redirect to={paths.ROOT} />;

  return (
    <section className="section hero is-fullheight is-error-section">
      {redirect}
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-fifths">
              <div className="card has-card-header-background">
                <header className="card-header">
                  <p className="card-header-title">
                    <span className="icon">
                      <i className="mdi mdi-lock default" />
                    </span>
                    <span>
                      {isEmailLink ? 'Set your new password' : 'Login'}
                    </span>
                  </p>
                </header>
                <div className="card-content">
                  <form onSubmit={onSubmitHandler}>
                    <div className="field">
                      <p className="label">E-mail Address</p>
                      <div className="control is-clearfix">
                        <input
                          className={`input ${inputs.email.modifier}`}
                          type="email"
                          name="email"
                          required
                          value={authData.email}
                          onChange={onChangeHandler}
                        />
                      </div>
                      {inputs.email.message && (
                        <p className={`help ${inputs.email.modifier}`}>
                          {inputs.email.message}
                        </p>
                      )}
                    </div>
                    <div className="field">
                      <p className="label">Password</p>
                      <div className="control is-clearfix">
                        <input
                          className={`input ${inputs.password.modifier}`}
                          type="password"
                          name="password"
                          required
                          value={authData.password}
                          onChange={onChangeHandler}
                        />
                      </div>
                      {inputs.password.message && (
                        <p className={`help ${inputs.password.modifier}`}>
                          {inputs.password.message}
                        </p>
                      )}
                    </div>
                    <hr />
                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          type="submit"
                          className={`button is-black ${modifierLoading}`}
                          disabled={isEmailLink ? !inputs.canSubmit : false}
                        >
                          {isEmailLink ? 'Set Password' : 'Login'}
                        </button>
                      </div>
                      {!isEmailLink && (
                        <div className="control">
                          <Link
                            to={paths.RESET_PASSWORD}
                            className="button is-outlined"
                          >
                            Forgot Password?
                          </Link>
                        </div>
                      )}
                    </div>
                    {error && (
                      <p className={`has-text-danger ${classes.errorMessage}`}>
                        {error}
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
