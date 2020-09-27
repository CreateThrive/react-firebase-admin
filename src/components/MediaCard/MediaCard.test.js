import { fireEvent } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';

import * as actions from 'state/actions/teams';
import MediaCard from '.';

const onDelete = jest.fn();
const onModify = jest.fn();

const testTeam = { id: 'teamTestId', name: 'testTeam', createdBy: 'test' };
describe('<MediaCard /> rendering', () => {
  const dispatchMock = jest.fn();
  let userData;

  beforeEach(() => {
    userData = {
      email: 'mkrukuy@gmail.com',
      name: 'Mateo',
      location: 'Montevideo, Uruguay',
      isAdmin: true,
      file: null,
      id: 'testId',
      logoUrl: 'some logoUrl',
      createdAt: '11/12/2020',
    };
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'fetchTeamUsers').mockImplementation(jest.fn);
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(
      <MediaCard content={userData} onDeleteHandler={onDelete} isUser />
    )({
      auth: { userData },
      teams: { teamid: 'testId' },
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should dispatch fetchTeamUsers action when clicking the component', () => {
    const { component } = renderWithProviders(
      <MediaCard content={testTeam} onDeleteHandler={onDelete} />
    )({
      auth: { userData },
      teams: { teamid: 'testId' },
    });

    fireEvent.click(component.getByTestId('media'));

    expect(actions.fetchTeamUsers).toBeCalledTimes(1);

    expect(actions.fetchTeamUsers).toBeCalledWith('teamTestId');
  });

  it('should should not render the delete button for non-admin users', () => {
    const { component } = renderWithProviders(
      <MediaCard
        content={testTeam}
        onDeleteHandler={onDelete}
        onModifyHandler={onModify}
      />
    )({
      auth: { userData: { ...userData, isAdmin: false } },
      teams: { teamid: 'teamTestId' },
    });

    expect(component.queryByTestId('delete')).toBeNull();
  });

  it('should dispatch onDelete action when clicking the delete button', () => {
    const { component } = renderWithProviders(
      <MediaCard
        content={testTeam}
        onDeleteHandler={onDelete}
        onModifyHandler={onModify}
      />
    )({
      auth: { userData },
      teams: { teamid: 'teamTestId' },
    });

    fireEvent.click(component.getByTestId('delete'));

    expect(onDelete).toBeCalledTimes(1);
  });

  it('should dispatch onModify action when clicking the modify button', () => {
    const { component } = renderWithProviders(
      <MediaCard
        content={userData}
        onDeleteHandler={onDelete}
        onModifyHandler={onModify}
      />
    )({
      auth: { userData },
      teams: { teamid: 'teamTestId' },
    });

    fireEvent.click(component.getByTestId('modify'));

    expect(onModify).toBeCalledTimes(1);
  });

  it('should redirect to the user profile when clicking the modify button', () => {
    const { component } = renderWithProviders(
      <MediaCard
        content={userData}
        onDeleteHandler={onDelete}
        onModifyHandler={onModify}
        isUser
      />
    )({
      auth: { userData },
      teams: { teamid: 'teamTestId' },
    });

    fireEvent.click(component.getByRole('link'));

    expect(window.location.pathname).toBe(`/users/${userData.id}`);
  });
});
