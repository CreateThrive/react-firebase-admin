/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DatePicker from '../DatePicker';
import { useChangeHandler } from '../../utils/hooks';
import { validateEmail } from '../../utils';
import './UserForm.scss';
import { usersCleanUp } from '../../state/actions/users';
import paths from '../../pages/Router/paths';

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

  const onDateChangedHandler = createdAt =>
    setUser(prevState => ({
      ...prevState,
      createdAt: createdAt.toDateString()
    }));

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

  if (invalidEmail) {
    emailInput = {
      modifier: 'is-danger',
      message: {
        modifier: 'is-danger',
        content: 'Invalid E-mail'
      }
    };
  }

  const canSubmit =
    user.name && user.location && user.createdAt && !invalidEmail;

  const imagePreviewUrl = !user.logoUrl
    ? user.file && URL.createObjectURL(user.file)
    : user.logoUrl;

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
                User Information
              </p>
            </header>
            <div className="card-content">
              <form onSubmit={onSubmitHandler}>

              {isEditing ? (
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">E-mail</label>
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
                      <label className="label">E-mail</label>
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
                    <label className="label">Name</label>
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
                    <label className="label">Location</label>
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
                      <label className="label">Admin</label>
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
                    <label className="label">Created</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <DatePicker
                        date={new Date(user.createdAt)}
                        onChange={onDateChangedHandler}
                      />
                    </div>
                  </div>
                </div>

                <hr />

                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Logo</label>
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
                              {user.file ? 'Pick another file' : 'Pick a file'}
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
                            <span>Submit</span>
                          </button>
                        </div>
                        { !isProfile && (
                          <Link to={paths.USERS} className="button">
                            Go Back
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
                User Preview
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
                  <label className="label">E-mail</label>
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
                <label className="label">Name</label>
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
                <label className="label">Location</label>
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
                  <label className="label">Admin</label>
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
                <label className="label">Created</label>
                <div className="control is-clearfix">
                  <input
                    type="text"
                    readOnly="readOnly"
                    className="input is-static"
                    value={user.createdAt}
                  />
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
