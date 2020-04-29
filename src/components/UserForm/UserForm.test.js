import React from 'react';
import * as reactRedux from 'react-redux';

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
      tenant: 'some tenantId',
      createdAt: new Date().toDateString()
    };
  });

  it('should render without crashing', () => {
    const user = { ...userData, createdAt: '11/21/2020' };

    const { component } = shallowWithProvider(
      <UserForm userData={user} action={actions.createUser} />
    )({
      users: {}
    });

    expect(component).toMatchSnapshot();
  });

  it('should display user name preview', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} action={actions.createUser} />
    )({
      users: {}
    });

    expect(
      component
        .find('input.input.is-static')
        .at(1)
        .props().value
    ).toEqual('Mateo');
  });

  it('should display email preview if it is creating a new user', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} action={actions.createUser} />
    )({
      users: {}
    });

    expect(
      component
        .find('input.input.is-static')
        .first()
        .props().value
    ).toEqual('mkrukuy@gmail.com');
  });

  it('should display location preview', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} isEditing action={actions.createUser} />
    )({
      users: {}
    });

    expect(
      component
        .find('input.input.is-static')
        .at(2)
        .props().value
    ).toEqual('Montevideo, Uruguay');
  });

  it('should display admin preview', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} isEditing action={actions.createUser} />
    )({
      users: {}
    });

    expect(component.exists('.icon')).toBeTruthy();
  });

  it('should display created preview', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} isEditing action={actions.createUser} />
    )({
      users: {}
    });

    expect(
      component
        .find('input.input.is-static')
        .last()
        .props().value
    ).toEqual(new Date().toDateString());
  });
});

describe('<LoginForm /> actions', () => {
  const dispatchMock = jest.fn();
  let userData;

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'createUser').mockImplementation(jest.fn);
    jest.spyOn(actions, 'modifyUser').mockImplementation(jest.fn);
    userData = {
      name: 'Mateo',
      email: 'mkrukuy@gmail.com',
      location: 'Montevideo, Uruguay',
      id: 'test id',
      logoUrl: 'some logoUrl',
      tenant: 'some tenantId',
      isAdmin: false,
      file: null,
      createdAt: new Date().toDateString()
    };
  });

  it('should dispatch createUser action when creating a new user', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} action={actions.createUser} />
    )({
      users: {}
    });

    component.find('form').simulate('submit');

    expect(actions.createUser).toHaveBeenCalled();
  });

  it('should dispatch modifyUser action when editing a user', () => {
    const { component } = mountWithProvider(
      <UserForm userData={userData} isEditing action={actions.modifyUser} />
    )({
      users: {}
    });

    component.find('form').simulate('submit');

    expect(actions.modifyUser).toHaveBeenCalled();
  });
});
