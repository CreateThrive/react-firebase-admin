import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

import { useFormatMessage } from 'hooks';
import UserForm from 'components/UserForm';
import { modifyUser } from 'state/actions/users';
import ChangePassword from './ChangePassword';

const Profile = () => {
  const { userData } = useSelector(
    state => ({
      userData: state.auth.userData
    }),
    shallowEqual
  );

  return (
    <>
      <section className="hero is-hero-bar">
        <div className="hero-body">
          <h1 className="title">
            {useFormatMessage('Profile.profile', 'Profile')}
          </h1>
        </div>
      </section>
      <section className="section is-main-section">
        <UserForm isEditing isProfile userData={userData} action={modifyUser} />
        <ChangePassword />
      </section>
    </>
  );
};

export default Profile;
