import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useChangeHandler } from 'utils/hooks';
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
                      <FormattedMessage
                        id="ResetPassword.recovery"
                        defaultMessage="Password Recovery"
                      />
                    </span>
                  </p>
                </header>
                <div className="card-content">
                  {restoredPassword ? (
                    <p className={classes['sub-title']}>
                      <FormattedMessage
                        id="ResetPassword.recoverEmail"
                        defaultMessage="We have sent you an email to {mail} so
                        you can recover your account."
                        values={{ mail: resetPasswordData.email }}
                      />
                    </p>
                  ) : (
                    <form onSubmit={onSubmitHandler}>
                      <div className="field">
                        <p className="label">
                          <FormattedMessage
                            id="ResetPassword.email"
                            defaultMessage="E-mail Address"
                          />
                        </p>
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
                        <p className="help">
                          <FormattedMessage
                            id="ResetPassword.emailRegistration"
                            defaultMessage="E-mail used for registration"
                          />
                        </p>
                      </div>
                      <hr />
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            className={`button is-black ${modifierLoading}`}
                            type="submit"
                          >
                            <FormattedMessage
                              id="ResetPassword.resetLink"
                              defaultMessage="Send Reset Link"
                            />
                          </button>
                        </div>
                        <div className="control">
                          <Link to={paths.LOGIN} className="button is-outlined">
                            <FormattedMessage
                              id="ResetPassword.back"
                              defaultMessage="Back"
                            />
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
