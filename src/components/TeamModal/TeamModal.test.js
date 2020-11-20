import { fireEvent } from '@testing-library/react';
import React from 'react';
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom';

import * as actions from 'state/actions/teams';
import TeamModal from '.';

describe('<TeamModal /> rendering', () => {
  const dispatchMock = jest.fn();
  let teamData;

  const state = {
    auth: { userData: { isAdmin: true } },
    teams: {
      success: false,
      deleted: false,
      loadingUsers: false,
      loadingTeams: false,
      teamsList: ['testTeam'],
      usersList: [{ name: 'testUser' }],
    },
    users: { data: ['testUser'] },
  };

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'modifyTeam').mockImplementation(jest.fn);
    jest.spyOn(actions, 'createTeam').mockImplementation(jest.fn);

    teamData = {
      id: 'test id',
      name: 'Test name',
      description: 'Test description',
      createdBy: 'Test User',
      logoUrl: 'some logo',
      users: [],
    };
  });

  it('should render without crashing', () => {
    const { component } = renderWithProviders(
      <TeamModal isActive onCancel={jest.fn()} />
    )({
      ...state,
    });

    expect(component.asFragment()).toMatchSnapshot();
  });

  it('should disable Cancel button when loading', () => {
    const onCancel = jest.fn();
    const { component } = renderWithProviders(
      <TeamModal isActive onCancel={onCancel} />
    )({
      ...state,
      teams: {
        ...state.teams,
        loadingTeams: true,
      },
    });

    expect(component.getByText('Cancel')).toBeDisabled();
  });

  it('should call onCancel when clicking Cancel button', () => {
    const onCancel = jest.fn();
    const { component } = renderWithProviders(
      <TeamModal isActive onCancel={onCancel} />
    )({
      ...state,
    });

    fireEvent.click(component.getByText('Cancel'));

    expect(onCancel).toBeCalledTimes(1);
  });

  it('should display the add button loading correctly', () => {
    const onCancel = jest.fn();
    const { component } = renderWithProviders(
      <TeamModal isActive onCancel={onCancel} />
    )({
      ...state,
      teams: {
        ...state.teams,
        loadingTeams: true,
      },
    });

    expect(component.getByText('Add Team')).toHaveClass('is-loading');
  });

  it('should dispatch createTeam action when creating a new user', async () => {
    const { component } = renderWithProviders(
      <TeamModal isActive onCancel={jest.fn()} />
    )({ ...state });

    fireEvent.click(component.getByText('Add Team'));

    await (() => expect(actions.createTeam).toBeCalledTimes(1));

    await (() => expect(actions.createTeam).toBeCalledWith(teamData));
  });

  it('should dispatch modifyTeam action when editing a user', async () => {
    const { component } = renderWithProviders(
      <TeamModal isActive onCancel={jest.fn()} isEditing />
    )({ ...state });

    fireEvent.click(component.getByText('Update Team'));

    await (() => expect(actions.modifyTeam).toBeCalledTimes(1));

    await (() => expect(actions.modifyTeam).toBeCalledWith(teamData));
  });
});
