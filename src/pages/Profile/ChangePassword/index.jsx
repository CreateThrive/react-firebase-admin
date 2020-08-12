/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import { changeUserPassword, authCleanUp } from 'state/actions/auth';
import { useChangeHandler, useFormatMessage } from 'hooks';

const ChangePasswordCard = () => {
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirmation: ''
  });

  const onChangeHandler = useChangeHandler(setPasswords);

  const { loading, changedPassword } = useSelector(
    state => ({
      loading: state.auth.loading,
      changedPassword: state.auth.changedPassword
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(authCleanUp());
  }, [dispatch]);

  useEffect(() => {
    if (changedPassword) {
      setPasswords({
        current: '',
        new: '',
        confirmation: ''
      });
    }
  }, [changedPassword, setPasswords]);

  let inputs = {
    new: {
      modifier: null,
      message: { modifier: null, content: null }
    },
    confirmation: {
      modifier: null,
      message: { modifier: null, content: null }
    }
  };

  const setInputs = (key, value) => {
    inputs = { ...inputs, [`${key}`]: value };
  };

  const isNewPasswordSecure = passwords.new && passwords.new.length >= 6;

  const safePasswordMessage = useFormatMessage(`ChangePassword.safePassword`);

  const insecurePasswordMessage = useFormatMessage(
    `ChangePassword.insecurePassword`
  );

  if (isNewPasswordSecure) {
    setInputs('new', {
      modifier: 'is-success',
      message: {
        modifier: 'is-success',
        content: safePasswordMessage
      }
    });
  } else if (passwords.new) {
    setInputs('new', {
      modifier: 'is-danger',
      message: {
        modifier: 'is-danger',
        content: insecurePasswordMessage
      }
    });
  }

  const newPasswordsAreEqual =
    passwords.new &&
    passwords.confirmation &&
    passwords.new === passwords.confirmation;

  const passwordsMatchMessagge = useFormatMessage(
    `ChangePassword.matchPassword`
  );

  const notMatchPasswordMessage = useFormatMessage(
    `ChangePassword.notMatchPassword`
  );

  if (newPasswordsAreEqual) {
    setInputs('confirmation', {
      modifier: 'is-success',
      message: {
        modifier: 'is-success',
        content: passwordsMatchMessagge
      }
    });
  } else if (passwords.confirmation) {
    setInputs('confirmation', {
      modifier: 'is-danger',
      message: {
        modifier: 'is-danger',
        content: notMatchPasswordMessage
      }
    });
  }

  const currentAndNewPasswordsEqual =
    passwords.new && passwords.current === passwords.new;

  const samePasswordMessage = useFormatMessage(`ChangePassword.samePassword`);

  const errorMessage = currentAndNewPasswordsEqual && samePasswordMessage;

  const canSubmit =
    isNewPasswordSecure && newPasswordsAreEqual && !currentAndNewPasswordsEqual;

  const onSubmitHandler = event => {
    event.preventDefault();
    dispatch(changeUserPassword(passwords.current, passwords.confirmation));
  };

  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon">
            <i className="fa fa-lock" />
          </span>
          {useFormatMessage(`ChangePassword.changePassword`)}
        </p>
      </header>
      <div className="card-content">
        <form onSubmit={onSubmitHandler}>
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">
                {useFormatMessage(`ChangePassword.currentPassword`)}
              </label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="current"
                    required
                    value={passwords.current}
                    onChange={onChangeHandler}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">
                {useFormatMessage(`ChangePassword.newPassword`)}
              </label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${inputs.new.modifier}`}
                    type="password"
                    name="new"
                    required
                    value={passwords.new}
                    onChange={onChangeHandler}
                  />
                </div>
                {inputs.new.message.content ? (
                  <p className={`help is-${inputs.new.message.modifier}`}>
                    {inputs.new.message.content}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="field is-horizontal">
            <div className="field-label is-normal">
              <label className="label">
                {useFormatMessage(`ChangePassword.confirmPassword`)}
              </label>
            </div>
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <input
                    className={`input ${inputs.confirmation.modifier}`}
                    type="password"
                    name="confirmation"
                    required
                    value={passwords.confirmation}
                    onChange={onChangeHandler}
                  />
                </div>
                {inputs.confirmation.message.content && (
                  <p
                    className={`help is-${inputs.confirmation.message.modifier}`}
                  >
                    {inputs.confirmation.message.content}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="field is-horizontal">
            <div className="field-label is-normal" />
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button
                    type="submit"
                    className={`button is-primary ${loading && 'is-loading'}`}
                    disabled={!canSubmit}
                  >
                    {useFormatMessage(`ChangePassword.submits`)}
                  </button>
                </div>
                {errorMessage && (
                  <p className="help is-danger">{errorMessage}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
