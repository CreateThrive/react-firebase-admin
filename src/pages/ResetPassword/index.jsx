import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { useChangeHandler, useFormatMessage } from 'hooks';
import { resetPassword, authCleanUp } from 'state/actions/auth';
import paths from 'pages/Router/paths';
import classes from './ResetPassword.module.scss';

const ResetPassword = () => {
  const { loading, error, restoredPassword, isAuth } = useSelector(
    state => ({
      loading: state.auth.loading,
      error: state.auth.error,
      restoredPassword: state.auth.restoredPassword,
      isAuth: !!state.auth.userData.userId
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [resetPasswordData, setResetPasswordData] = useState('');

  const onChangeHandler = useChangeHandler(setResetPasswordData);

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

  const onSubmitHandler = event => {
    event.preventDefault();
    dispatch(resetPassword(resetPasswordData.email));
  };

  const modifierLoading = loading && 'is-loading';

  const redirect = isAuth && <Redirect to={paths.ROOT} />;

  const recoverEmailMessage = useFormatMessage(
    'ResetPassword.recoverEmail',
    'We have sent you an email to {mail} so you can recover your account.',
    { mail: resetPasswordData.email }
  );
  const emailMessage = useFormatMessage(
    'ResetPassword.email',
    'E-mail Address'
  );
  const emailRegistrationMessage = useFormatMessage(
    'ResetPassword.emailRegistration',
    'E-mail used for registration'
  );
  const resetLinkMessage = useFormatMessage(
    'ResetPassword.resetLink',
    'Send Reset Link'
  );
  const backMessage = useFormatMessage('ResetPassword.back', 'Back');

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
                      <i className="mdi mdi-lock-open default" />
                    </span>
                    <span>
                      {useFormatMessage(
                        'ResetPassword.recovery',
                        'Password Recovery'
                      )}
                    </span>
                  </p>
                </header>
                <div className="card-content">
                  {restoredPassword ? (
                    <p className={classes['sub-title']}>
                      {recoverEmailMessage}
                    </p>
                  ) : (
                    <form onSubmit={onSubmitHandler}>
                      <div className="field">
                        <p className="label">{emailMessage}</p>
                        <div className="control">
                          <input
                            type="email"
                            className="input"
                            required
                            value={resetPasswordData.email}
                            name="email"
                            onChange={onChangeHandler}
                          />
                        </div>
                        <p className="help">{emailRegistrationMessage}</p>
                      </div>
                      <hr />
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            className={`button is-black ${modifierLoading}`}
                            type="submit"
                          >
                            {resetLinkMessage}
                          </button>
                        </div>
                        <div className="control">
                          <Link to={paths.LOGIN} className="button is-outlined">
                            {backMessage}
                          </Link>
                        </div>
                      </div>
                      {error && (
                        <p
                          className={`has-text-danger ${classes.errorMessage}`}
                        >
                          {error}
                        </p>
                      )}
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
