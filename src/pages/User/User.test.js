import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import UserForm from 'components/UserForm';
import User from '.';

describe('<User /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithIntlProvider(<User />)({ users: {} });

    expect(component).toMatchSnapshot();
  });

  it('should not show the spinner when creating a user', () => {
    const { component } = mountWithIntlProvider(<User />)({ users: {} });

    expect(component.exists(ClipLoader)).toBeFalsy();
  });

  it('should render the UserForm component when creating a user', () => {
    const { component } = mountWithIntlProvider(<User />)({ users: {} });

    expect(component.exists(UserForm)).toBeTruthy();
  });
});
