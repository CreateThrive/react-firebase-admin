import React from 'react';

import * as actions from 'state/actions/users';
import UserForm from '.';

describe('<UserForm /> rendering', () => {
  let userData;
  beforeEach(() => {
    userData = {
      email: 'mkrukuy@gmail.com',
      name: 'Mateo',
      location: 'Montevideo, Uruguay',
      isAdmin: false,
      file: null,
      id: 'test id',
      logoUrl: 'some logoUrl',
      createdAt: new Date().toDateString(),
    };
  });

  it('should render without crashing', () => {
    const user = { ...userData, createdAt: '11/21/2020' };

    const { component } = shallowWithProviders(
      <UserForm user={user} action={actions.createUser} />
    )({
      users: {},
    });

    expect(component).toMatchSnapshot();
  });

  it('should display user name preview', () => {
    const { component } = mountWithProviders(
      <UserForm user={userData} action={actions.createUser} />
    )({
      users: {},
    });

    expect(component.find('input.input.is-static').at(1).props().value).toEqual(
      'Mateo'
    );
  });

  it('should display email preview if it is creating a new user', () => {
    const { component } = mountWithProviders(
      <UserForm user={userData} action={actions.createUser} />
    )({
      users: {},
    });

    expect(
      component.find('input.input.is-static').first().props().value
    ).toEqual('mkrukuy@gmail.com');
  });

  it('should display location preview', () => {
    const { component } = mountWithProviders(
      <UserForm user={userData} isEditing action={actions.createUser} />
    )({
      users: {},
    });

    expect(component.find('input.input.is-static').at(2).props().value).toEqual(
      'Montevideo, Uruguay'
    );
  });

  it('should display admin preview', () => {
    const { component } = mountWithProviders(
      <UserForm user={userData} isEditing action={actions.createUser} />
    )({
      users: {},
    });

    expect(component.exists('.icon')).toBeTruthy();
  });

  it('should display created preview', () => {
    const { component } = mountWithProviders(
      <UserForm user={userData} isEditing action={actions.createUser} />
    )({
      users: {},
    });
    expect(component.find('p.date')).toBeTruthy();
  });
});
