/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import paths from 'pages/Router/paths';
import { usersCleanUp } from 'state/actions/users';
import { useChangeHandler, useFormatDate, useFormatMessage } from 'hooks';
import { validateEmail } from 'utils';
import './UserForm.scss';
import DatePicker from '../DatePicker';

const UserForm = ({ isEditing, isProfile, userData, action }) => {
  const { loading } = useSelector(
    state => ({
      loading: state.users.loading
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(usersCleanUp());
  }, [dispatch]);

  const [user, setUser] = useState(userData);

  const onChangeHandler = useChangeHandler(setUser);

  const onFileChangedHandler = event => {
    const file = event.target.files[0];
    setUser(prevState => ({ ...prevState, file, logoUrl: null }));
  };

  const onSubmitHandler = event => {
    event.preventDefault();
    dispatch(
      action({ ...user, createdAt: user.createdAt, isEditing, isProfile })
    );
  };

  let emailInput = {
    modifier: null,
    message: { modifier: null, content: null }
  };

  const invalidEmail = user.email && !validateEmail(user.email);

  const invalidEmailMessage = useFormatMessage('UserForm.invalidEmail');

  if (invalidEmail) {
    emailInput = {
      modifier: 'is-danger',
      message: {
        modifier: 'is-danger',
        content: invalidEmailMessage
      }
    };
  }

  const canSubmit =
    user.name && user.location && user.createdAt && !invalidEmail;

  const imagePreviewUrl = !user.logoUrl
    ? user.file && URL.createObjectURL(user.file)
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
              <form onSubmit={onSubmitHandler}>
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
                            value={user.email}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="field is-horizontal">
                    <div className="field-label is-normal">
                      <label className="label">{emailMessage}</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control">
                          <input
                            className={`input ${emailInput.modifier}`}
                            type="email"
                            required
                            name="email"
                            value={user.email}
                            onChange={onChangeHandler}
                          />
                        </div>
                        {emailInput.message.content && (
                          <p
                            className={`help is-${emailInput.message.modifier}`}
                          >
                            {emailInput.message.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
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
                          id="name"
                          className="input"
                          type="text"
                          required
                          name="name"
                          value={user.name}
                          onChange={onChangeHandler}
                        />
                      </div>
                    </div>
                  </div>
                </div>

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
                          name="location"
                          required
                          value={user.location}
                          onChange={onChangeHandler}
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
                                onChange={onChangeHandler}
                                checked={user.isAdmin}
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
                      <DatePicker
                        name="createdAt"
                        date={new Date(user.createdAt)}
                        setState={setUser}
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
                            accept="image/*"
                            onChange={onFileChangedHandler}
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <i className="fas fa-upload" />
                            </span>
                            <span className="file-label">
                              {user.file
                                ? pickAnotherFileMessage
                                : pickFileMessage}
                            </span>
                          </span>
                          <span className="file-name">
                            {user.file && user.file.name}
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
                            className={`button is-primary ${loading &&
                              'is-loading'}`}
                            disabled={!canSubmit}
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
                      type="text"
                      readOnly="readOnly"
                      className="input is-static"
                      value={user.email}
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
                    type="text"
                    readOnly="readOnly"
                    className="input is-static"
                    value={user.name}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">
                  {useFormatMessage('UserForm.location')}
                </label>
                <div className="control is-clearfix">
                  <input
                    type="text"
                    readOnly="readOnly"
                    className="input is-static"
                    value={user.location}
                  />
                </div>
              </div>

              {!isProfile && (
                <div className="field">
                  <label className="label">{adminMessage}</label>
                  <div className="control is-clearfix">
                    {user.isAdmin ? (
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
                <div className="control is-clearfix">
                  <p className="date">
                    {useFormatDate(user.createdAt, {
                      weekday: 'short',
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
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
  isEditing: PropTypes.bool,
  userData: PropTypes.shape({
    id: PropTypes.string,
    isAdmin: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
    tenant: PropTypes.string,
    createdAt: PropTypes.string.isRequired
  }),
  action: PropTypes.func.isRequired
};

export default UserForm;
