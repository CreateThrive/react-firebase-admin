import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import User from '.';
import UserForm from '../../components/UserForm';

describe('<User /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProvider(<User />)({ users: {} });

    expect(component).toMatchSnapshot();
  });

  it('should not show the spinner when creating a user', () => {
    const { component } = mountWithProvider(<User />)({ users: {} });

    expect(component.exists(ClipLoader)).toBeFalsy();
  });

  it('should render the UserForm component when creating a user', () => {
    const { component } = mountWithProvider(<User />)({ users: {} });

    expect(component.exists(UserForm)).toBeTruthy();
  });
});
