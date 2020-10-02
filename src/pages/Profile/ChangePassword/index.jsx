/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import classNames from 'classnames';

import { changeUserPassword, authCleanUp } from 'state/actions/auth';
import { useFormatMessage } from 'hooks';
import ErrorMessage from 'components/ErrorMessage';

const schema = yup.object().shape({
  current: yup.string().min(6).required(),
  new: yup
    .string()
    .min(6)
    .notOneOf([yup.ref('current')])
    .required(),
  confirmation: yup
    .string()
    .equals([yup.ref('new')])
    .required(),
});

const ChangePasswordCard = () => {
  const { loading, changedPassword } = useSelector(
    (state) => ({
      loading: state.auth.loading,
      changedPassword: state.auth.changedPassword,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { register, handleSubmit, watch, setValue, errors } = useForm({
    mode: 'onChange',
    defaultValues: {
      current: '',
      new: '',
      confirmation: '',
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (changedPassword) {
      setValue('current', '');
      setValue('new', '');
      setValue('confirmation', '');
    }
    return () => dispatch(authCleanUp());
  }, [dispatch, changedPassword, setValue]);

  const newPassword = watch('new');
  const confirmationPassword = watch('confirmation');

  const invalidPasswordMessage = useFormatMessage(
    `ChangePassword.invalidPassword`
  );

  const safePasswordMessage = useFormatMessage(`ChangePassword.safePassword`);

  const insecurePasswordMessage = useFormatMessage(
    `ChangePassword.insecurePassword`
  );

  const passwordsMatchMessagge = useFormatMessage(
    `ChangePassword.matchPassword`
  );

  const notMatchPasswordMessage = useFormatMessage(
    `ChangePassword.notMatchPassword`
  );

  const samePasswordMessage = useFormatMessage(`ChangePassword.samePassword`);

  const onSubmitHandler = ({ current, confirmation }) => {
    dispatch(changeUserPassword(current, confirmation));
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
        <form onSubmit={handleSubmit(onSubmitHandler)}>
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
                    data-testid="current"
                    className={classNames('input', {
                      'is-danger': errors.current,
                    })}
                    type="password"
                    name="current"
                    ref={register}
                  />
                </div>
                {errors.current && (
                  <ErrorMessage text={invalidPasswordMessage} />
                )}
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
                    data-testid="new"
                    className={classNames(
                      `input`,
                      { 'is-success': newPassword && !errors.new },
                      { 'is-danger': errors.new }
                    )}
                    type="password"
                    name="new"
                    ref={register}
                  />
                </div>
                {errors.new ? (
                  <ErrorMessage
                    text={
                      newPassword.length < 6
                        ? insecurePasswordMessage
                        : samePasswordMessage
                    }
                  />
                ) : (
                  newPassword && (
                    <p className="is-success">{safePasswordMessage}</p>
                  )
                )}
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
                    data-testid="confirmation"
                    className={classNames(
                      `input`,
                      {
                        'is-success':
                          confirmationPassword && !errors.confirmation,
                      },
                      {
                        'is-danger': errors.confirmation,
                      }
                    )}
                    type="password"
                    name="confirmation"
                    ref={register}
                  />
                </div>
                {errors.confirmation ? (
                  <ErrorMessage text={notMatchPasswordMessage} />
                ) : (
                  confirmationPassword && (
                    <p className="is-success">{passwordsMatchMessagge}</p>
                  )
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
                  >
                    {useFormatMessage(`ChangePassword.submits`)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordCard;
