/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { yupResolver } from '@hookform/resolvers';

import paths from 'pages/Router/paths';
import { usersCleanUp } from 'state/actions/users';
import { useFormatDate, useFormatMessage } from 'hooks';
import DatePicker from 'components/DatePicker';
import ErrorMessage from 'components/ErrorMessage';

import './UserForm.scss';

const UserForm = ({ isEditing, isProfile, user, onSubmitHandler, schema }) => {
  const { loading, success } = useSelector(
    (state) => ({
      loading: state.users.loading,
      success: state.users.success,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const { register, handleSubmit, errors, control, watch, setValue } = useForm({
    defaultValues: { ...user },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (success) {
      setValue('file', null);
    }
    return () => dispatch(usersCleanUp());
  }, [dispatch, success, setValue]);

  const invalidEmailMessage = useFormatMessage('UserForm.invalidEmail');

  const imagePreviewUrl =
    watch('file') && watch('file')[0]
      ? URL.createObjectURL(watch('file')[0])
      : user.logoUrl;

  const goBackMessage = useFormatMessage('UserForm.goBack');

  const pickAnotherFileMessage = useFormatMessage('UserForm.pickAnotherFile');
  const pickFileMessage = useFormatMessage('UserForm.pickFile');

  const emailMessage = useFormatMessage('UserForm.email');

  const adminMessage = useFormatMessage('UserForm.admin');

  return (
    <>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <div className="card tile is-child">
            <header className="card-header">
              <p className="card-header-title">
                <span className="icon">
                  <i className="mdi mdi-account-edit default" />
                </span>
                {useFormatMessage('UserForm.userInfo')}
              </p>
            </header>
            <div className="card-content">
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                {isEditing ? (
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{emailMessage}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input
                            type="text"
                            readOnly="readOnly"
                            className="input is-static"
                            name="email"
                            ref={register}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="field is-horizontal">
                      <div className="field-label is-normal">
                        <label className="label">{emailMessage}</label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <input
                              className={classNames(`input`, {
                                'is-danger': errors.email,
                              })}
                              ref={register}
                              name="email"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {errors.email && (
                      <div className="field is-horizontal">
                        <div className="field-label is-normal" />
                        <div className="field-body">
                          <ErrorMessage text={invalidEmailMessage} />
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">
                      {useFormatMessage('UserForm.name')}
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          name="name"
                          id="name"
                          className={classNames('input', {
                            'is-danger': errors.name,
                          })}
                          ref={register}
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {errors.name && (
                  <div className="field is-horizontal">
                    <div className="field-label is-normal" />
                    <div className="field-body">
                      <ErrorMessage />
                    </div>
                  </div>
                )}
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">
                      {useFormatMessage('UserForm.location')}
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          ref={register}
                          name="location"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {!isProfile && (
                  <div className="field has-check is-horizontal">
                    <div className="field-label">
                      <label className="label">{adminMessage}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="field">
                          <div className="control">
                            <label className="b-checkbox checkbox">
                              <input
                                type="checkbox"
                                name="isAdmin"
                                ref={register}
                              />
                              <span className="check is-primary" />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">
                      {useFormatMessage('UserForm.created')}
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <Controller
                        control={control}
                        name="createdAt"
                        render={({ onChange, name, value }) => (
                          <DatePicker
                            name={name}
                            onChange={onChange}
                            date={new Date(value)}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>

                <hr />

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">
                      {useFormatMessage('UserForm.logo')}
                    </label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="file has-name">
                        <label className="file-label">
                          <input
                            className="file-input"
                            type="file"
                            name="file"
                            ref={register}
                            accept="image/*"
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="mdi mdi-upload" />
                            </span>
                            <span className="file-label">
                              {watch('file') && watch('file').file
                                ? pickAnotherFileMessage
                                : pickFileMessage}
                            </span>
                          </span>
                          <span className="file-name">
                            {watch('file') && watch('file')[0]?.name}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
                <div className="field is-horizontal">
                  <div className="field-label" />
                  <div className="field-body">
                    <div className="field">
                      <div className="field is-grouped">
                        <div className="control">
                          <button
                            type="submit"
                            className={`button is-primary ${
                              loading && 'is-loading'
                            }`}
                          >
                            <span>{useFormatMessage('UserForm.submit')}</span>
                          </button>
                        </div>
                        {!isProfile && (
                          <Link to={paths.USERS} className="button">
                            {goBackMessage}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="tile is-parent preview">
          <div className="card tile is-child">
            <header className="card-header">
              <p className="card-header-title">
                <span className="icon">
                  <i className="mdi mdi-account default" />
                </span>
                {useFormatMessage('UserForm.userPreview')}
              </p>
            </header>
            <div className="card-content">
              {imagePreviewUrl && (
                <>
                  <div className="is-user-avatar image has-max-width is-aligned-center">
                    <img
                      className="user-avatar"
                      src={imagePreviewUrl}
                      alt="User profile logo preview"
                    />
                  </div>
                  <hr />
                </>
              )}

              {!isEditing && (
                <div className="field">
                  <label className="label">{emailMessage}</label>
                  <div className="control is-clearfix">
                    <input
                      data-testid="email"
                      type="text"
                      readOnly="readOnly"
                      className="input is-static"
                      value={watch('email')}
                    />
                  </div>
                </div>
              )}

              <div className="field">
                <label className="label">
                  {useFormatMessage('UserForm.name')}
                </label>
                <div className="control is-clearfix">
                  <input
                    data-testid="name"
                    type="text"
                    readOnly="readOnly"
                    className="input is-static"
                    value={watch('name')}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  {useFormatMessage('UserForm.location')}
                </label>
                <div className="control is-clearfix">
                  <input
                    data-testid="location"
                    type="text"
                    readOnly="readOnly"
                    className="input is-static"
                    value={watch('location')}
                  />
                </div>
              </div>

              {!isProfile && (
                <div className="field">
                  <label className="label">{adminMessage}</label>
                  <div className="control is-clearfix" data-testid="admin">
                    {watch('isAdmin') ? (
                      <span className="icon">
                        <i className="mdi mdi-check" />
                      </span>
                    ) : (
                      <span className="icon">
                        <i className="mdi mdi-close" />
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="field">
                <label className="label">
                  {useFormatMessage('UserForm.created')}
                </label>
                <div className="control is-clearfix" data-testid="date">
                  <p className="date">
                    {useFormatDate(watch('createdAt'), {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

UserForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string,
    logoUrl: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  schema: PropTypes.object.isRequired,
  isEditing: PropTypes.bool,
  isProfile: PropTypes.bool,
};

UserForm.defaultProps = {
  isEditing: false,
  isProfile: false,
};

export default UserForm;
