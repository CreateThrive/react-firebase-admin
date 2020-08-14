import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import UserForm from 'components/UserForm';
import { createUser, modifyUser, fetchUsers } from 'state/actions/users';
import paths from 'pages/Router/paths';
import { useFormatMessage } from 'hooks';

const User = () => {
  const { id } = useParams();

  const { success, userData, error } = useSelector(
    (state) => ({
      success: state.users.success,
      userData: state.users.user,
      error: state.users.error,
    }),
    shallowEqual
  );

  const [user, setUser] = useState(userData || {});

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      if (userData.id === id) {
        setUser(userData);
      } else {
        dispatch(fetchUsers(id));
      }
    }
  }, [id, userData]);

  const isEditing = !!id;

  const userForm =
    !user && id ? (
      <ClipLoader />
    ) : (
      <UserForm
        isEditing={isEditing}
        user={user}
        setUser={setUser}
        action={isEditing ? modifyUser : createUser}
      />
    );

  const redirect = (error || success) && <Redirect to={paths.USERS} />;

  const editUserMessage = useFormatMessage('User.editUser');

  const newUserMessage = useFormatMessage('User.editUser');

  return (
    <>
      {redirect}
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <h1 className="title">
            {isEditing ? editUserMessage : newUserMessage}
          </h1>
        </div>
      </section>
      <section className="section is-main-section">{userForm}</section>
    </>
  );
};

export default User;
