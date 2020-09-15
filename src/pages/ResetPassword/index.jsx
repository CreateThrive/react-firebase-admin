import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { useFormatMessage } from 'hooks';
import { resetPassword, authCleanUp } from 'state/actions/auth';
import paths from 'pages/Router/paths';
import ErrorMessage from 'components/ErrorMessage';

import classes from './ResetPassword.module.scss';

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ResetPassword = () => {
  const { loading, error, restoredPassword, isAuth } = useSelector(
    (state) => ({
      loading: state.auth.loading,
      error: state.auth.error,
      restoredPassword: state.auth.restoredPassword,
      isAuth: !!state.auth.userData.userId,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, watch } = useForm({
    resolver: yupResolver(schema),
  });

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

  const onSubmitHandler = ({ email }) => {
    dispatch(resetPassword(email));
  };

  const redirect = isAuth && <Redirect to={paths.ROOT} />;

  const recoverEmailMessage = useFormatMessage('ResetPassword.recoverEmail', {
    mail: watch('email'),
  });
  const emailMessage = useFormatMessage('ResetPassword.email');
  const emailRegistrationMessage = useFormatMessage(
    'ResetPassword.emailRegistration'
  );
  const resetLinkMessage = useFormatMessage('ResetPassword.resetLink');
  const backMessage = useFormatMessage('ResetPassword.back');

  const invalidEmailMessage = useFormatMessage('invalidEmail');

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
                    <span>{useFormatMessage('ResetPassword.recovery')}</span>
                  </p>
                </header>
                <div className="card-content">
                  {restoredPassword ? (
                    <p className={classes['sub-title']}>
                      {recoverEmailMessage}
                    </p>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                      <div className="field">
                        <p className="label">{emailMessage}</p>
                        <div className="control">
                          <input
                            className={classNames('input', {
                              'is-danger': errors.email,
                            })}
                            ref={register}
                            name="email"
                          />
                        </div>
                        {errors.email && (
                          <ErrorMessage text={invalidEmailMessage} />
                        )}
                        <p className="help">{emailRegistrationMessage}</p>
                      </div>
                      <hr />
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            className={classNames(`button is-black`, {
                              'is-loading': loading,
                            })}
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
