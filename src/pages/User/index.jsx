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

  const { success, usersList } = useSelector(
    (state) => ({
      success: state.users.success,
      usersList: state.users.data,
    }),
    shallowEqual
  );

  const [user, setUser] = useState({
    name: '',
    email: '',
    location: '',
    isAdmin: false,
    file: null,
    createdAt: new Date().toDateString(),
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const thisUser = usersList
        ?.filter((fetchedUser) => fetchedUser.id === id)
        .pop();
      if (thisUser) {
        setUser(thisUser);
      } else {
        dispatch(fetchUsers(id));
      }
    }
  }, [id]);

  useEffect(() => {
    const thisUser = usersList
      ?.filter((fetchedUser) => fetchedUser.id === id)
      .pop();
    setUser(thisUser);
  }, [usersList]);

  const isEditing = !!id;

  const userForm =
    !user.name && id ? (
      <ClipLoader />
    ) : (
      <UserForm
        isEditing={isEditing}
        userData={user}
        action={isEditing ? modifyUser : createUser}
      />
    );

  const redirect = (user.error || success) && <Redirect to={paths.USERS} />;

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
