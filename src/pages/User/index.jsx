import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import UserForm from 'components/UserForm';
import { createUser, modifyUser, fetchUsers } from 'state/actions/users';
import paths from 'pages/Router/paths';
import { useFormatMessage } from 'hooks';

const User = () => {
  const { id } = useParams();

  const isEditing = useMemo(() => !!id, [id]);

  const { success, userData, error } = useSelector(
    (state) => ({
      success: state.users.success,
      userData: state.users.data.find((user) => user.id === id),
      error: state.users.error,
    }),
    shallowEqual
  );

  const [user, setUser] = useState(
    isEditing
      ? userData
      : {
          name: '',
          email: '',
          location: '',
          createdAt: new Date().toDateString(),
          isAdmin: false,
        }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      if (!userData) {
        dispatch(fetchUsers(id));
      }

      if (userData && !user) {
        setUser(userData);
      }
    }
  }, [isEditing, id, userData, user, dispatch]);

  const redirect = ((isEditing && error) || success) && (
    <Redirect to={paths.USERS} />
  );

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
      <section className="section is-main-section">
        {isEditing && !user ? (
          <ClipLoader />
        ) : (
          <UserForm
            isEditing={isEditing}
            user={user}
            setUser={setUser}
            action={isEditing ? modifyUser : createUser}
          />
        )}
      </section>
    </>
  );
};

export default User;
