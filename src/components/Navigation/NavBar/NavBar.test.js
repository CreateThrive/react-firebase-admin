import React from 'react';
import * as reactRedux from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../../state/actions/auth';
import NavBar from '.';

const onHandleMobile = jest.fn();

describe('<NavBar /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProvider(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    expect(component).toMatchSnapshot();
  });

  it('should render the links correctly', () => {
    const { component } = mountWithProvider(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    expect(component.find(Link)).toHaveLength(1);
  });
});

describe('<Bar /> actions', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest
      .spyOn(reactRedux, 'useDispatch')
      .mockImplementation(() => dispatchMock);
    jest.spyOn(actions, 'logout').mockImplementation(jest.fn);
  });

  it('should dispatch logout action when the user tries to logout', () => {
    const { component } = mountWithProvider(
      <NavBar handleMobileToggle={onHandleMobile} />
    )({
      auth: {
        userData: {}
      }
    });

    component.find('#logout').simulate('click');

    expect(actions.logout).toHaveBeenCalled();
  });
});
