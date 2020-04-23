import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

import UserForm from 'components/UserForm';
import { createUser, modifyUser } from 'state/actions/users';
import paths from 'pages/Router/paths';
import firebase from 'firebase.js';

const User = () => {
  const { id } = useParams();

  const { success } = useSelector(
    state => ({
      success: state.users.success
    }),
    shallowEqual
  );

  const [user, setUser] = useState({
    name: '',
    email: '',
    location: '',
    isAdmin: false,
    file: null,
    createdAt: new Date().toDateString()
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const response = (
        await firebase
          .database()
          .ref(`users/${id}`)
          .once('value')
      ).val();
      return response;
    };

    if (id) {
      fetchUserData()
        .then(userData => {
          setUser({
            ...userData,
            createdAt: userData.createdAt,
            id,
            isAdmin: userData.isAdmin
          });
        })
        .catch(() => {
          setUser({ error: true });
        });
    }
  }, [id]);

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

  return (
    <>
      {redirect}
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <h1 className="title">{isEditing ? 'Edit User' : 'New User'}</h1>
        </div>
      </section>
      <section className="section is-main-section">{userForm}</section>
    </>
  );
};

export default User;
