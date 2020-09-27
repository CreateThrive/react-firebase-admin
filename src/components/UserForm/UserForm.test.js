import React from 'react';
import * as reactRedux from 'react-redux';
import { fireEvent } from '@testing-library/react';
import * as yup from 'yup';
import '@testing-library/jest-dom';

import * as actions from 'state/actions/users';
import UserForm from '.';

const onSubmitHandler = jest.fn();

const schema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().notRequired().moreThan(0),
  zipCode: yup.number().notRequired().moreThan(1).lessThan(100000),
  gender: yup.object().notRequired(),
});

describe('<UserForm /> rendering', () => {
  let userData;
  const dispatchMock = jest.fn();

  beforeEach(() => {
    userData = {
      email: 'test@test.com',
      name: 'Test',
      location: 'Montevideo, Uruguay',
      isAdmin: false,
      file: null,
      id: 'test id',
      logoUrl: 'some logoUrl',
      createdAt: '11/12/2020',
    };
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'usersCleanUp').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const user = { ...userData, createdAt: '11/21/2020' };

    const { component } = renderWithProviders(
      <UserForm
        user={user}
        action={actions.createUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should display user name preview', () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        action={actions.createUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    expect(component.getByTestId('name')).toHaveAttribute('value', 'Test');
  });

  it('should display email preview if it is creating a new user', () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        action={actions.createUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    expect(component.getByTestId('email')).toHaveAttribute(
      'value',
      'test@test.com'
    );
  });

  it('should display location preview', () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        isEditing
        action={actions.createUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    expect(component.getByTestId('location')).toHaveAttribute(
      'value',
      'Montevideo, Uruguay'
    );
  });

  it('should display admin preview', () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        isEditing
        action={actions.createUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    expect(component.getByTestId('admin')).toBeTruthy();
  });

  it('should display created preview', () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        isEditing
        action={actions.createUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });
    expect(component.getByTestId('date')).toBeTruthy();
  });
});

describe('<LoginForm /> actions', () => {
  const dispatchMock = jest.fn();
  const setUser = jest.fn();

  let userData;
  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'createUser').mockImplementation(jest.fn);
    jest.spyOn(actions, 'modifyUser').mockImplementation(jest.fn);
    userData = {
      name: 'Test',
      email: 'test@test.com',
      location: 'Montevideo, Uruguay',
      id: 'test id',
      logoUrl: 'some logoUrl',
      isAdmin: false,
      file: null,
      createdAt: '11/12/2020',
    };
  });

  it('should dispatch createUser action when creating a new user', async () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        action={actions.createUser}
        setUser={setUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    fireEvent.submit(component.container.querySelector('form'));

    await (() => expect(actions.createUser).toBeCalledTimes(1));

    await (() => expect(actions.createUser).toBeCalledWith(userData));
  });

  it('should dispatch modifyUser action when editing a user', async () => {
    const { component } = renderWithProviders(
      <UserForm
        user={userData}
        isEditing
        action={actions.modifyUser}
        setUser={setUser}
        onSubmitHandler={onSubmitHandler}
        schema={schema}
      />
    )({
      users: {},
    });

    fireEvent.submit(component.container.querySelector('form'));

    await (() => expect(actions.modifyUser).toBeCalledTimes(1));

    await (() => expect(actions.modifyUser).toBeCalledWith(userData));
  });
});
