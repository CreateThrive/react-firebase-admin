import React from 'react';

import ChangePassword from '.';

describe('<ChangePassword /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
      },
    });

    expect(component).toMatchSnapshot();
  });

  it('should display the button loading when loading', () => {
    const { component } = mountWithProviders(<ChangePassword />)({
      auth: {
        userData: {},
        loading: true,
      },
    });

    expect(component.exists('button.is-loading')).toBeTruthy();
  });
});
