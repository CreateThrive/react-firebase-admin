import React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import * as yup from 'yup';

import { useFormatMessage } from 'hooks';
import UserForm from 'components/UserForm';
import { modifyUser } from 'state/actions/users';
import ChangePassword from './ChangePassword';

const schema = yup.object().shape({
  name: yup.string().required(),
  isAdmin: yup.boolean().notRequired(),
  location: yup.string().notRequired(),
  createdAt: yup.string().required(),
});

const Profile = () => {
  const { userData } = useSelector(
    (state) => ({
      userData: state.auth.userData,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  const onSubmitHandler = (value) => {
    const newUser = {
      ...value,
      file: value?.file[0] || null,
      isEditing: true,
      isProfile: true,
      id: userData.id,
    };
    dispatch(modifyUser(newUser));
  };

  return (
    <>
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <h1 className="title">{useFormatMessage('Profile.profile')}</h1>
        </div>
      </section>
      <section className="section is-main-section">
        <UserForm
          isEditing
          isProfile
          user={userData}
          onSubmitHandler={onSubmitHandler}
          schema={schema}
        />
        <ChangePassword />
      </section>
    </>
  );
};

export default Profile;
