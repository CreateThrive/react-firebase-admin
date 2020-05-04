import React from 'react';
import Profile from '.';

describe('<Profile /> rendering', () => {
  it('should render without crashing', () => {
    const { component } = shallowWithIntlProvider(<Profile />)({
      users: {},
      auth: {}
    });

    expect(component).toMatchSnapshot();
  });
});
