/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import 'bulma-social/bin/bulma-social.min.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.min.css';

import firebase from 'firebase.js';
import {
  auth,
  setPassword,
  authCleanUp,
  authFacebook
} from 'state/actions/auth';
import { useChangeHandler, useFormatMessage } from 'hooks';
import { inputValidations } from 'utils';
import paths from '../Router/paths';
import classes from './Login.module.scss';

const Login = () => {
  const { error, isAuth, loading, locale } = useSelector(
    state => ({
      error: state.auth.error,
      isAuth: !!state.auth.userData.id,
      loading: state.auth.loading,
      locale: state.preferences.locale
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

  const onFacebookHandler = () => {
    dispatch(authFacebook());
  };

  const onGoogleHandler = () => {
    alert('Coming soon');
  };

  const onMicrosoftHandler = () => {
    alert('Coming soon');
  };

  const inputs = isEmailLink
    ? inputValidations(authData.email, authData.password, locale)
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

  const setNewPasswordMessage = useFormatMessage('Login.setNewPassword');

  const loginMessage = useFormatMessage('Login.login');

  const setPasswordMessage = useFormatMessage('Login.setPassword');

  const forgotPasswordMessage = useFormatMessage('Login.forgotPassword');

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
                      {isEmailLink ? setNewPasswordMessage : loginMessage}
                    </span>
                  </p>
                </header>
                <div className="card-content">
                  <form onSubmit={onSubmitHandler}>
                    <div className="field">
                      <p className="label">{useFormatMessage('Login.email')}</p>
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
                      <p className="label">
                        {useFormatMessage('Login.password')}
                      </p>
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
                    <br />
                    <div className="field is-grouped">
                      <div className="control">
                        <button
                          type="submit"
                          className={`button is-black ${modifierLoading}`}
                          disabled={isEmailLink ? !inputs.canSubmit : false}
                        >
                          {isEmailLink ? setPasswordMessage : loginMessage}
                        </button>
                      </div>
                      {!isEmailLink && (
                        <div className="control">
                          <Link
                            to={paths.RESET_PASSWORD}
                            className="button is-outlined"
                          >
                            {forgotPasswordMessage}
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
                  <hr />
                  <div className={`${classes.socialButtons} field is-grouped`}>
                    <a
                      className={`${classes.socialButton} is-facebook`}
                      onClick={onFacebookHandler}
                    >
                      <span className={`${classes.icon} icon`}>
                        <i className="fab fa-facebook" />
                      </span>
                      <span>{useFormatMessage('Login.facebook')}</span>
                    </a>
                    <a
                      className={`${classes.socialButton} is-google`}
                      onClick={onGoogleHandler}
                    >
                      <span className={`${classes.icon} icon`}>
                        <i className="fab fa-google" />
                      </span>
                      <span>{useFormatMessage('Login.google')}</span>
                    </a>
                    <a
                      className={`${classes.socialButton} is-microsoft`}
                      onClick={onMicrosoftHandler}
                    >
                      <span className={`${classes.icon} icon`}>
                        <i className="fab fa-microsoft" />
                      </span>
                      <span>{useFormatMessage('Login.microsoft')}</span>
                    </a>
                  </div>
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
