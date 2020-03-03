import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import classes from './ResetPassword.module.scss';
import { useChangeHandler } from '../../utils/hooks';
import { resetPassword, authCleanUp } from '../../state/actions/auth';
import paths from '../Router/paths';

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
                    <span>Password Recovery</span>
                  </p>
                </header>
                <div className="card-content">
                  {restoredPassword ? (
                    <p className={classes['sub-title']}>
                      We have sent you an email to {resetPasswordData.email} so
                      you can recover your account.
                    </p>
                  ) : (
                    <form onSubmit={onSubmitHandler}>
                      <div className="field">
                        <p className="label">E-mail Address</p>
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
                        <p className="help">E-mail used for registration</p>
                      </div>
                      <hr />
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            className={`button is-black ${modifierLoading}`}
                            type="submit"
                          >
                            Send Reset Link
                          </button>
                        </div>
                        <div className="control">
                          <Link to={paths.LOGIN} className="button is-outlined">
                            Back
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
